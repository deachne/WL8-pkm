#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import fg from 'fast-glob';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

class WL8DocsServer {
  private server: Server;
  private docsPath: string;

  constructor() {
    this.server = new Server(
      {
        name: 'wl8-docs-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          resources: {
            listResources: true,
            readResource: true
          },
          tools: {
            listTools: true,
            callTool: true
          }
        },
      }
    );

    // Use environment variable for docs path if provided, fallback to relative path
    const __filename = new URL(import.meta.url).pathname;
    const __dirname = path.dirname(__filename);
    this.docsPath = process.env.WL8_DOCS_PATH || path.join(__dirname, '../../../');

    // Debug logging
    console.error('[DEBUG] MCP Server Initialization:');
    console.error(`[DEBUG] Using docs path: ${this.docsPath}`);
    console.error(`[DEBUG] Current directory: ${process.cwd()}`);
    console.error(`[DEBUG] __dirname equivalent: ${__dirname}`);

    this.setupResourceHandlers();
    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error: any) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupResourceHandlers() {
    // List available documentation resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      const docFiles = await fg(['**/*.md'], { cwd: this.docsPath });
      
      return {
        resources: docFiles.map(file => ({
          uri: `wl8-docs://${file}`,
          name: path.basename(file, '.md'),
          mimeType: 'text/markdown',
          description: `WL8 documentation for ${path.basename(file, '.md')}` as const
        }))
      };
    });

    // Read specific documentation file
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request: { params: { uri: string } }) => {
      const uri = request.params.uri;
      console.error(`[DEBUG] Received resource request for URI: ${uri}`);
      
      // Simplified URI handling - just extract the path after the protocol
      const match = uri.match(/^wl8-docs:\/\/(.+)$/);
      
      if (!match) {
        console.error(`[DEBUG] Invalid URI format: ${uri}`);
        throw new McpError(ErrorCode.InvalidRequest, `Invalid URI format: ${uri}. Expected format: wl8-docs://path/to/file.md`);
      }
      
      let filePath = match[1];
      
      // Remove any 'docs/' prefix if present
      if (filePath.startsWith('docs/')) {
        filePath = filePath.substring(5);
      }
      
      const fullPath = path.join(this.docsPath, filePath);
      console.error(`[DEBUG] Resolved full path: ${fullPath}`);
      console.error(`[DEBUG] File exists check: ${fs.existsSync(fullPath)}`);
      
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const { data, content: docContent } = matter(content);
        
        return {
          contents: [
            {
              uri,
              mimeType: 'text/markdown',
              text: content,
              metadata: {
                title: data.title || path.basename(filePath, '.md'),
                ...data
              }
            }
          ]
        };
      } catch (error: any) {
        console.error(`[DEBUG] Error reading file: ${error.message}`);
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Documentation file not found at path: ${fullPath}. Error: ${error.message}`
        );
      }
    });
  }

  // Helper method to read a file from path
  private async readDocFile(filePath: string) {
    try {
      const fullPath = path.join(this.docsPath, filePath);
      console.error(`[DEBUG] Reading file: ${fullPath}`);
      
      if (!fs.existsSync(fullPath)) {
        throw new Error(`File not found: ${fullPath}`);
      }
      
      const content = fs.readFileSync(fullPath, 'utf-8');
      const { data, content: docContent } = matter(content);
      
      return {
        content,
        metadata: {
          title: data.title || path.basename(filePath, '.md'),
          ...data
        }
      };
    } catch (error: any) {
      console.error(`[DEBUG] Error reading file: ${error.message}`);
      throw error;
    }
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'search_docs',
          description: 'Search WL8 documentation for specific terms or topics',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Search query'
              },
              section: {
                type: 'string',
                description: 'Optional documentation section to search within',
                enum: ['api-reference', 'wealth-lab-framework', 'general'],
                optional: true
              },
              fullContent: {
                type: 'boolean',
                description: 'Whether to return the full document content instead of just excerpts',
                optional: true
              }
            },
            required: ['query']
          }
        },
        {
          name: 'read_resource',
          description: 'Read a specific documentation file by path',
          inputSchema: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                description: 'Path to the documentation file (e.g., "api-reference/indicator-base.md")'
              }
            },
            required: ['path']
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args = {} } = request.params;
      
      if (name === 'search_docs') {
        const { query, section, fullContent } = args as {
          query: string;
          section?: string;
          fullContent?: boolean;
        };

        console.error(`[DEBUG] search_docs called with query: "${query}", section: "${section || 'all'}", fullContent: ${fullContent || false}`);

        try {
          const searchPattern = section 
            ? `${section}/**/*.md`
            : '**/*.md';
            
          console.error(`[DEBUG] Searching with pattern: ${searchPattern} in ${this.docsPath}`);
          const docFiles = await fg([searchPattern], { cwd: this.docsPath });
          console.error(`[DEBUG] Found ${docFiles.length} files matching pattern`);
          
          interface SearchResult {
            file: string;
            title: string;
            excerpt: string;
            content?: string;
            section?: string;
          }
          
          const results: SearchResult[] = [];

          for (const file of docFiles) {
            const fullPath = path.join(this.docsPath, file);
            console.error(`[DEBUG] Checking file: ${fullPath}`);
            
            const content = fs.readFileSync(fullPath, 'utf-8');
            const { data, content: docContent } = matter(content);
            
            const queryLower = query.toLowerCase();
            const contentLower = docContent.toLowerCase();
            const titleLower = (data.title || '').toLowerCase();
            
            if (contentLower.includes(queryLower) || titleLower.includes(queryLower)) {
              console.error(`[DEBUG] Match found in file: ${file}`);
              
              // Create an excerpt
              let excerpt: string;
              const pos = contentLower.indexOf(queryLower);
              if (pos !== -1) {
                const start = Math.max(0, pos - 50);
                const end = Math.min(docContent.length, pos + query.length + 150);
                excerpt = docContent.substring(start, end) + "...";
              } else {
                // If query is in title but not content, use the beginning of the content
                excerpt = docContent.substring(0, 200) + "...";
              }
              
              // Determine the section from the file path
              let section: string | undefined;
              const pathParts = file.split('/');
              if (pathParts.length > 1) {
                section = pathParts[0];
              }
              
              const result: SearchResult = {
                file,
                title: data.title || path.basename(file, '.md'),
                excerpt,
                section
              };
              
              // Include full content if requested
              if (fullContent) {
                result.content = content;
              }
              
              results.push(result);
            }
          }
          
          console.error(`[DEBUG] Found ${results.length} matching documents`);

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(results, null, 2)
              }
            ]
          };
        } catch (error: any) {
          return {
            content: [
              {
                type: 'text',
                text: `Error searching docs: ${error.message}`
              }
            ],
            isError: true
          };
        }
      } else if (name === 'read_resource') {
        const { path: filePath } = args as { path: string };
        
        console.error(`[DEBUG] read_resource called with path: ${filePath}`);
        
        try {
          const { content, metadata } = await this.readDocFile(filePath);
          console.error(`[DEBUG] Successfully read file: ${filePath}`);
          
          return {
            content: [
              {
                type: 'text',
                text: content
              }
            ]
          };
        } catch (error: any) {
          console.error(`[DEBUG] Error in read_resource: ${error.message}`);
          console.error(`[DEBUG] Stack trace: ${error.stack}`);
          
          return {
            content: [
              {
                type: 'text',
                text: `Error reading file: ${error.message}\nPlease ensure the path is correct and the file exists.`
              }
            ],
            isError: true
          };
        }
      } else {
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${name}`
        );
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('WL8 Docs MCP server running on stdio');
  }
}

const server = new WL8DocsServer();
server.run().catch(console.error);
