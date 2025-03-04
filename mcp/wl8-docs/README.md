# WL8 Documentation MCP Server

A Model Context Protocol server that provides intelligent search capabilities for WealthLab 8 documentation.

## Features

- Full-text search across all WL8 documentation
- Section-specific searches (api-reference or wealth-lab-framework)
- Markdown file parsing with front matter support
- Automatic indexing of new documentation files
- Integration with Claude AI for natural language queries

## Technical Details

### Tools

- `search_docs`: Search through documentation
  - Parameters:
    - `query`: Search term or phrase
    - `section`: Optional section filter ('api-reference' or 'wealth-lab-framework')
  - Returns: Array of matching documents with title and excerpt

### Implementation

- Built with TypeScript and Node.js
- Uses fast-glob for efficient file searching
- gray-matter for Markdown front matter parsing
- Relative path resolution for portable deployment
- Automatic documentation discovery

## Development

### Prerequisites

- Node.js
- npm

### Building

```bash
npm install
npm run build
```

### Project Structure

```
wl8-docs/
├── src/
│   └── index.ts    # Main server implementation
├── package.json    # Dependencies and scripts
└── tsconfig.json  # TypeScript configuration
```

## Testing

You can test the server through Claude by asking documentation-related questions. Example queries:
- "What's the documentation for strategies?"
- "Show me indicator documentation"
- "Find information about TimeSeries"

## Contributing

1. Follow TypeScript best practices
2. Maintain error handling and logging
3. Test new features thoroughly
4. Update documentation as needed
