# WL8-pkm (WealthLab 8 Platform Knowledge Management)

This repository contains comprehensive API documentation and reference materials for the WealthLab 8 platform, along with an MCP server for searching through the documentation.

## Structure

- `docs/`: Documentation directories
  - `api-reference/`: Detailed API documentation for WealthLab 8 components
    - Contains markdown files documenting classes, interfaces, and components
    - Includes usage examples and technical specifications
  - `wealth-lab-framework/`: Framework documentation and guides
- `mcp/`: Model Context Protocol servers
  - `wl8-docs/`: Documentation search server
    - Provides tools for searching through WL8 documentation
    - Integrates with Claude AI for intelligent documentation lookup

## Documentation Search with MCP

This repository includes an MCP server that enables intelligent searching through the WealthLab 8 documentation. The server integrates with Claude AI to help you find relevant documentation quickly.

### Features

- Full-text search across all documentation
- Filter searches by section (api-reference or wealth-lab-framework)
- Returns relevant excerpts with context
- Integrates with both VSCode and Claude desktop app

### Setting up the MCP Server

1. Clone this repository
2. Build the MCP server:
   ```bash
   cd mcp/wl8-docs
   npm install
   npm run build
   ```

3. Add the server configuration to your MCP settings:

   For VSCode (`~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`):
   ```json
   {
     "mcpServers": {
       "wl8-docs": {
         "command": "node",
         "args": ["path/to/WL8-pkm/mcp/wl8-docs/build/index.js"],
         "disabled": false,
         "autoApprove": []
       }
     }
   }
   ```

   For Claude desktop app (`~/Library/Application Support/Claude/claude_desktop_config.json`):
   ```json
   {
     "mcpServers": {
       "wl8-docs": {
         "command": "node",
         "args": ["path/to/WL8-pkm/mcp/wl8-docs/build/index.js"],
         "disabled": false,
         "autoApprove": []
       }
     }
   }
   ```

4. Restart VSCode and the Claude desktop app

### Using the Documentation Search

Once set up, you can use Claude to search the documentation. Example queries:
- "Search for documentation about indicators"
- "Find information about strategies"
- "Look up the TimeSeries class documentation"

## Getting Started

1. Browse the API documentation in the `docs/api-reference` directory to learn about specific components and their usage
2. Set up the MCP server to enable documentation search through Claude
3. Use the search functionality to quickly find relevant documentation

## Contributing

Please follow the standard GitHub flow for contributions:
1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request

### Adding Documentation

When adding new documentation:
1. Place markdown files in the appropriate directory under `docs/`
2. Follow the existing markdown format
3. The MCP server will automatically index new documentation files

## License

This project is licensed under the terms specified by WealthLab 8 platform.
