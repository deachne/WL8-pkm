#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Configuration
const serverPath = '/Users/darcynestibo/Desktop/fix Mcp server WL8 pkm/WL8-pkm/mcp/wl8-docs/src/simple-server.js';
const docsPath = '/Users/darcynestibo/Desktop/fix Mcp server WL8 pkm/WL8-pkm/docs';

console.log('Starting MCP server test...');
console.log(`Server path: ${serverPath}`);
console.log(`Docs path: ${docsPath}`);

// Start the server
const server = spawn('node', [serverPath], {
  env: {
    ...process.env,
    WL8_DOCS_PATH: docsPath
  }
});

// Log server output
server.stdout.on('data', (data) => {
  console.log(`Server stdout: ${data}`);
});

server.stderr.on('data', (data) => {
  console.error(`Server stderr: ${data}`);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// Send a test request to the server
setTimeout(() => {
  console.log('Sending listTools request...');
  server.stdin.write(JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'listTools'
  }) + '\n');
}, 1000);

// Send a test request to search for documentation
setTimeout(() => {
  console.log('Sending search_docs request...');
  server.stdin.write(JSON.stringify({
    jsonrpc: '2.0',
    id: 2,
    method: 'callTool',
    params: {
      name: 'search_docs',
      arguments: {
        query: 'indicator',
        fullContent: false
      }
    }
  }) + '\n');
}, 2000);

// Send a test request to read a specific documentation file
setTimeout(() => {
  console.log('Sending read_resource request...');
  server.stdin.write(JSON.stringify({
    jsonrpc: '2.0',
    id: 3,
    method: 'callTool',
    params: {
      name: 'read_resource',
      arguments: {
        path: 'wealth-lab-framework/indicator-base.md'
      }
    }
  }) + '\n');
}, 3000);

// Keep the script running for 10 seconds
console.log('Server started. Waiting for responses...');
setTimeout(() => {
  console.log('Test complete. Killing server...');
  server.kill();
  process.exit(0);
}, 10000);
