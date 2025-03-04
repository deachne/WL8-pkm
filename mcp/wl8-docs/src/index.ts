#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types';
import axios from 'axios';
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
          resources: {},
          tools: {},
        },
      }
    );

    // Path to WL8 documentation files - relative to the MCP server location
    this.docsPath = path.join(__dirname, '../../../');

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
      const match = uri.match(/^wl8-docs:\/\/(.+)$/);
      
      if (!match) {
        throw new McpError(ErrorCode.InvalidRequest, `Invalid URI format: ${uri}`);
      }
      
      const filePath = match[1];
      const fullPath = path.join(this.docsPath, filePath);
      
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
        throw new McpError(
          ErrorCode.ResourceNotFound,
          `Documentation file not found: ${error.message}`
        );
      }
    });
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
                enum: ['api-reference', 'wealth-lab-framework'],
                optional: true
              }
            },
            required: ['query']
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request: { params: { name: string; arguments: any } }) => {
      if (request.params.name !== 'search_docs') {
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${request.params.name}`
        );
      }

      const { query, section } = request.params.arguments as {
        query: string;
        section?: string;
      };

      try {
        const searchPattern = section 
          ? `docs/${section}/**/*.md`
          : 'docs/**/*.md';
          
        const docFiles = await fg([searchPattern], { cwd: this.docsPath });
        interface SearchResult {
          file: string;
          title: string;
          content: string;
          metadata: Record<string, any>;
          matches: {
            context: string;
            position: number;
          }[];
        }
        
        const results: SearchResult[] = [];

        for (const file of docFiles) {
          const content = fs.readFileSync(path.join(this.docsPath, file), 'utf-8');
          const { data, content: docContent } = matter(content);
          
          const queryLower = query.toLowerCase();
          const contentLower = docContent.toLowerCase();
          const titleLower = (data.title || '').toLowerCase();
          
          if (contentLower.includes(queryLower) || titleLower.includes(queryLower)) {
            // Find all matches and their surrounding context
            const matches = [];
            let pos = contentLower.indexOf(queryLower);
            while (pos !== -1) {
              const start = Math.max(0, pos - 50);
              const end = Math.min(docContent.length, pos + query.length + 50);
              matches.push({
                context: docContent.substring(start, end),
                position: pos
              });
              pos = contentLower.indexOf(queryLower, pos + 1);
            }
            
            results.push({
              file,
              title: data.title || path.basename(file, '.md'),
              content: docContent,
              metadata: data,
              matches
            });
          }
        }

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
