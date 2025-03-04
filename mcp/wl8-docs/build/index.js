#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';
import { CallToolRequestSchema, ErrorCode, ListResourcesRequestSchema, ListToolsRequestSchema, ReadResourceRequestSchema, McpError, } from '@modelcontextprotocol/sdk/types';
import fg from 'fast-glob';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
class WL8DocsServer {
    server;
    docsPath;
    constructor() {
        this.server = new Server({
            name: 'wl8-docs-server',
            version: '0.1.0',
        }, {
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
        });
        // Use environment variable for docs path if provided, fallback to relative path
        this.docsPath = process.env.WL8_DOCS_PATH || path.join(__dirname, '../../../');
        // Debug logging
        console.error('[DEBUG] MCP Server Initialization:');
        console.error(`[DEBUG] Using docs path: ${this.docsPath}`);
        console.error(`[DEBUG] Current directory: ${process.cwd()}`);
        console.error(`[DEBUG] __dirname: ${__dirname}`);
        this.setupResourceHandlers();
        this.setupToolHandlers();
        // Error handling
        this.server.onerror = (error) => console.error('[MCP Error]', error);
        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }
    setupResourceHandlers() {
        // List available documentation resources
        this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
            const docFiles = await fg(['**/*.md'], { cwd: this.docsPath });
            return {
                resources: docFiles.map(file => ({
                    uri: `wl8-docs://${file}`,
                    name: path.basename(file, '.md'),
                    mimeType: 'text/markdown',
                    description: `WL8 documentation for ${path.basename(file, '.md')}`
                }))
            };
        });
        // Read specific documentation file
        this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
            const uri = request.params.uri;
            console.error(`[DEBUG] Received resource request for URI: ${uri}`);
            // Handle URIs with or without the docs/ prefix
            const match = uri.match(/^wl8-docs:\/\/((?:docs\/)?.*?)$/);
            if (!match) {
                throw new McpError(ErrorCode.InvalidRequest, `Invalid URI format: ${uri}`);
            }
            const filePath = match[1];
            const fullPath = path.join(this.docsPath, filePath.replace(/^docs\//, ''));
            console.error(`[DEBUG] Resolved full path: ${fullPath}`);
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
            }
            catch (error) {
                console.error(`[DEBUG] Error reading file: ${error.message}`);
                throw new McpError(ErrorCode.ResourceNotFound, `Documentation file not found at path: ${fullPath}. Error: ${error.message}`);
            }
        });
    }
    setupToolHandlers() {
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
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            if (request.params.name !== 'search_docs') {
                throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
            }
            const { query, section } = request.params.arguments;
            try {
                const searchPattern = section
                    ? `${section}/**/*.md`
                    : '**/*.md';
                console.error(`[DEBUG] Searching with pattern: ${searchPattern} in ${this.docsPath}`);
                const docFiles = await fg([searchPattern], { cwd: this.docsPath });
                console.error(`[DEBUG] Found ${docFiles.length} files matching pattern`);
                const results = [];
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
            }
            catch (error) {
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
