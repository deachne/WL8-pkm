#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ErrorCode, ListResourcesRequestSchema, ListToolsRequestSchema, McpError, } from '@modelcontextprotocol/sdk/types.js';
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
                resources: {},
                tools: {},
            },
        });
        // Path to WL8 documentation files
        this.docsPath = process.env.WL8_DOCS_PATH || '';
        if (!this.docsPath) {
            throw new Error('WL8_DOCS_PATH environment variable is required');
        }
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
                    ? `docs/${section}/**/*.md`
                    : 'docs/**/*.md';
                const docFiles = await fg([searchPattern], { cwd: this.docsPath });
                const results = [];
                for (const file of docFiles) {
                    const content = fs.readFileSync(path.join(this.docsPath, file), 'utf-8');
                    const { data, content: docContent } = matter(content);
                    if (docContent.toLowerCase().includes(query.toLowerCase()) ||
                        data.title?.toLowerCase().includes(query.toLowerCase())) {
                        results.push({
                            file,
                            title: data.title || path.basename(file, '.md'),
                            excerpt: docContent.substring(0, 200) + '...'
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
