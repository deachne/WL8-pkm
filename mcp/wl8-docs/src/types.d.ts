declare module '@modelcontextprotocol/sdk/server' {
  export class Server {
    constructor(info: { name: string; version: string }, config: { capabilities: any });
    setRequestHandler: (schema: any, handler: (request: any) => Promise<any>) => void;
    connect: (transport: any) => Promise<void>;
    close: () => Promise<void>;
    onerror: (error: any) => void;
  }
}

declare module '@modelcontextprotocol/sdk/server/stdio' {
  export class StdioServerTransport {
    constructor();
  }
}

declare module '@modelcontextprotocol/sdk/types' {
  export const CallToolRequestSchema: unique symbol;
  export const ListResourcesRequestSchema: unique symbol;
  export const ListToolsRequestSchema: unique symbol;
  export const ReadResourceRequestSchema: unique symbol;
  export enum ErrorCode {
    InvalidRequest = 'InvalidRequest',
    ResourceNotFound = 'ResourceNotFound',
    MethodNotFound = 'MethodNotFound'
  }
  export class McpError extends Error {
    constructor(code: ErrorCode, message: string);
  }
}

declare module 'fast-glob' {
  function glob(patterns: string[], options?: any): Promise<string[]>;
  export default glob;
}

declare module 'gray-matter' {
  function matter(content: string): { data: any; content: string };
  export default matter;
}
