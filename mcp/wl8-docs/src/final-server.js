#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const docsPath = process.env.WL8_DOCS_PATH || path.join(__dirname, '../../../docs');

console.error('[DEBUG] MCP Server Initialization:');
console.error(`[DEBUG] Using docs path: ${docsPath}`);
console.error(`[DEBUG] Current directory: ${process.cwd()}`);
console.error(`[DEBUG] __dirname: ${__dirname}`);

// Simple JSON-RPC 2.0 implementation
const handleRequest = async (request) => {
  console.error(`[DEBUG] Received request: ${JSON.stringify(request)}`);
  
  if (request.jsonrpc !== '2.0') {
    return {
      jsonrpc: '2.0',
      id: request.id,
      error: {
        code: -32600,
        message: 'Invalid Request'
      }
    };
  }
  
  // Handle different methods
  switch (request.method) {
    case 'listTools':
      return {
        jsonrpc: '2.0',
        id: request.id,
        result: {
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
        }
      };
    
    case 'listResources':
      try {
        // Get a list of all markdown files in the docs directory
        const resources = [];
        
        // Helper function to recursively walk the directory
        const walkDir = (dir) => {
          const files = fs.readdirSync(path.join(docsPath, dir));
          
          for (const file of files) {
            const filePath = path.join(dir, file);
            const fullPath = path.join(docsPath, filePath);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
              walkDir(filePath);
            } else if (file.endsWith('.md')) {
              resources.push({
                uri: `wl8-docs://${filePath}`,
                name: path.basename(file, '.md'),
                mimeType: 'text/markdown',
                description: `WL8 documentation for ${path.basename(file, '.md')}`
              });
            }
          }
        };
        
        walkDir('');
        
        // Return a limited number of resources to avoid JSON parsing issues
        // This is a workaround for the JSON parsing issues we're seeing
        const limitedResources = resources.slice(0, 20);
        
        return {
          jsonrpc: '2.0',
          id: request.id,
          result: {
            resources: limitedResources
          }
        };
      } catch (error) {
        console.error(`[DEBUG] Error listing resources: ${error.message}`);
        return {
          jsonrpc: '2.0',
          id: request.id,
          error: {
            code: -32603,
            message: `Internal error: ${error.message}`
          }
        };
      }
    
    case 'readResource':
      try {
        const uri = request.params.uri;
        console.error(`[DEBUG] Received resource request for URI: ${uri}`);
        
        // Extract the path from the URI
        const match = uri.match(/^wl8-docs:\/\/(.+)$/);
        if (!match) {
          console.error(`[DEBUG] Invalid URI format: ${uri}`);
          return {
            jsonrpc: '2.0',
            id: request.id,
            error: {
              code: -32602,
              message: `Invalid URI format: ${uri}. Expected format: wl8-docs://path/to/file.md`
            }
          };
        }
        
        let filePath = match[1];
        
        // Remove any 'docs/' prefix if present
        if (filePath.startsWith('docs/')) {
          filePath = filePath.substring(5);
        }
        
        const fullPath = path.join(docsPath, filePath);
        console.error(`[DEBUG] Resolved full path: ${fullPath}`);
        console.error(`[DEBUG] File exists check: ${fs.existsSync(fullPath)}`);
        
        if (!fs.existsSync(fullPath)) {
          return {
            jsonrpc: '2.0',
            id: request.id,
            error: {
              code: -32602,
              message: `File not found: ${fullPath}`
            }
          };
        }
        
        const content = fs.readFileSync(fullPath, 'utf-8');
        
        return {
          jsonrpc: '2.0',
          id: request.id,
          result: {
            contents: [
              {
                uri,
                mimeType: 'text/markdown',
                text: content
              }
            ]
          }
        };
      } catch (error) {
        console.error(`[DEBUG] Error reading resource: ${error.message}`);
        return {
          jsonrpc: '2.0',
          id: request.id,
          error: {
            code: -32603,
            message: `Internal error: ${error.message}`
          }
        };
      }
    
    case 'callTool':
      try {
        const { name, arguments: args } = request.params;
        
        if (name === 'search_docs') {
          const { query, section, fullContent } = args;
          console.error(`[DEBUG] search_docs called with query: "${query}", section: "${section || 'all'}", fullContent: ${fullContent || false}`);
          
          // Find all markdown files in the docs directory
          const results = [];
          
          // Helper function to recursively walk the directory
          const walkDir = (dir) => {
            const files = fs.readdirSync(path.join(docsPath, dir));
            
            for (const file of files) {
              const filePath = path.join(dir, file);
              const fullPath = path.join(docsPath, filePath);
              const stat = fs.statSync(fullPath);
              
              if (stat.isDirectory()) {
                // Skip directories that don't match the section filter
                if (section && dir === '' && file !== section) {
                  continue;
                }
                walkDir(filePath);
              } else if (file.endsWith('.md')) {
                // Skip files that don't match the section filter
                if (section && !filePath.startsWith(section + '/')) {
                  continue;
                }
                
                const content = fs.readFileSync(fullPath, 'utf-8');
                const queryLower = query.toLowerCase();
                const contentLower = content.toLowerCase();
                
                if (contentLower.includes(queryLower)) {
                  console.error(`[DEBUG] Match found in file: ${filePath}`);
                  
                  // Create an excerpt
                  let excerpt;
                  const pos = contentLower.indexOf(queryLower);
                  if (pos !== -1) {
                    const start = Math.max(0, pos - 50);
                    const end = Math.min(content.length, pos + query.length + 150);
                    excerpt = content.substring(start, end) + "...";
                  } else {
                    // If query is in title but not content, use the beginning of the content
                    excerpt = content.substring(0, 200) + "...";
                  }
                  
                  // Determine the section from the file path
                  let fileSection;
                  const pathParts = filePath.split('/');
                  if (pathParts.length > 1) {
                    fileSection = pathParts[0];
                  }
                  
                  const result = {
                    file: filePath,
                    title: path.basename(file, '.md'),
                    excerpt,
                    section: fileSection
                  };
                  
                  // Include full content if requested
                  if (fullContent) {
                    result.content = content;
                  }
                  
                  results.push(result);
                }
              }
            }
          };
          
          walkDir('');
          console.error(`[DEBUG] Found ${results.length} matching documents`);
          
          // Limit the number of results to avoid JSON parsing issues
          const limitedResults = results.slice(0, 10);
          
          return {
            jsonrpc: '2.0',
            id: request.id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(limitedResults, null, 2)
                }
              ]
            }
          };
        } else if (name === 'read_resource') {
          const { path: filePath } = args;
          console.error(`[DEBUG] read_resource called with path: ${filePath}`);
          
          const fullPath = path.join(docsPath, filePath);
          console.error(`[DEBUG] Reading file: ${fullPath}`);
          
          if (!fs.existsSync(fullPath)) {
            return {
              jsonrpc: '2.0',
              id: request.id,
              result: {
                content: [
                  {
                    type: 'text',
                    text: `Error reading file: File not found: ${fullPath}\nPlease ensure the path is correct and the file exists.`
                  }
                ],
                isError: true
              }
            };
          }
          
          const content = fs.readFileSync(fullPath, 'utf-8');
          console.error(`[DEBUG] Successfully read file: ${filePath}`);
          
          return {
            jsonrpc: '2.0',
            id: request.id,
            result: {
              content: [
                {
                  type: 'text',
                  text: content
                }
              ]
            }
          };
        } else {
          return {
            jsonrpc: '2.0',
            id: request.id,
            error: {
              code: -32601,
              message: `Method not found: ${name}`
            }
          };
        }
      } catch (error) {
        console.error(`[DEBUG] Error calling tool: ${error.message}`);
        return {
          jsonrpc: '2.0',
          id: request.id,
          error: {
            code: -32603,
            message: `Internal error: ${error.message}`
          }
        };
      }
    
    default:
      return {
        jsonrpc: '2.0',
        id: request.id,
        error: {
          code: -32601,
          message: `Method not found: ${request.method}`
        }
      };
  }
};

// Set up readline interface for stdin/stdout
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Process each line of input
rl.on('line', async (line) => {
  try {
    const request = JSON.parse(line);
    const response = await handleRequest(request);
    
    // Ensure proper JSON formatting by using JSON.stringify
    const responseStr = JSON.stringify(response);
    
    // Output the response
    console.log(responseStr);
  } catch (error) {
    console.error(`[DEBUG] Error processing request: ${error.message}`);
    console.log(JSON.stringify({
      jsonrpc: '2.0',
      id: null,
      error: {
        code: -32700,
        message: `Parse error: ${error.message}`
      }
    }));
  }
});

// Handle process termination
process.on('SIGINT', () => {
  console.error('[DEBUG] Received SIGINT, shutting down');
  rl.close();
  process.exit(0);
});

console.error('WL8 Docs MCP server running on stdio');
