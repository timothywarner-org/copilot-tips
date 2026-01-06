# MCP Server Configuration Guide

This document explains the Model Context Protocol (MCP) server configuration for the copilot-tips repository and how to use it with GitHub Copilot.

## Overview

The copilot-tips repository includes an **MCP server configuration** (`.vscode/mcp.json`) that connects GitHub Copilot to the official GitHub MCP server. This enables AI agents to access GitHub data directly, making it ideal for a project focused on GitHub Copilot tips and best practices.

## Why GitHub MCP Server?

The GitHub MCP server is the perfect fit for this O'Reilly teaching project because:

1. **Project Alignment** - The repository IS about GitHub Copilot, so having Copilot access GitHub data creates a learning loop
2. **Real-World Scenario** - Demonstrates how to integrate MCP servers in a Node.js/Express project
3. **Teaching Value** - Shows students how AI agents can access external APIs through a standardized protocol
4. **Practical Tools** - Provides access to:
   - List and search repositories
   - Fetch issue and pull request data
   - Analyze GitHub discussions
   - Access repository metadata

## MCP Configuration File Structure

### Location
```
.vscode/
└── mcp.json
```

### File Format

The `mcp.json` file contains two main sections:

#### 1. Servers Section
Defines available MCP servers and their connection details:

```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.github.com/mcp",
      "description": "GitHub MCP Server for accessing GitHub repositories, issues, pull requests, and discussions"
    }
  }
}
```

**Fields:**
- `type`: Connection type
  - `"http"` - Remote HTTP server (used here for GitHub)
  - `"sse"` - Server-Sent Events
  - `"stdio"` - Local process via stdin/stdout
  - `"pipe"` - Windows named pipe or Unix socket
- `url`: HTTP endpoint for the GitHub MCP server
- `description`: Human-readable explanation of the server's purpose

#### 2. Inputs Section (Optional)
Defines sensitive data that users provide at runtime:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "github-token",
      "description": "GitHub Personal Access Token (optional, for higher rate limits and private repos)",
      "password": true
    }
  ]
}
```

**Input Fields:**
- `type`: `"promptString"` - Prompts user for input
- `id`: Identifier used in environment variables (`${input:github-token}`)
- `description`: Explanation shown to user
- `password`: If `true`, hides input in UI (masked as •••)

## Using the GitHub MCP Server

### Step 1: Enable in Copilot Chat

1. Open GitHub Copilot Chat in VS Code
2. Switch to **Agent** mode (bottom of chat panel)
3. Click the **Tools** icon (tool selector)
4. Select the **github** server to enable it

### Step 2: Authenticate (Optional but Recommended)

For higher rate limits and access to private repositories:

1. The first time you use the GitHub server, VS Code prompts for authentication
2. You can provide a GitHub Personal Access Token via the `inputs` section
3. Token is stored securely in VS Code's credential manager

### Step 3: Use GitHub Tools

Once enabled, you can ask Copilot to use GitHub tools:

**Example Prompts:**
```
List the top GitHub Copilot repositories by stars
Search for repositories related to "MCP servers" with Python language
Fetch recent issues from the microsoft/vscode repository
Get pull request information for a specific repository
Analyze discussions about GitHub Copilot in popular repos
```

## Configuration Best Practices

### 1. Version Control
- **Include** `.vscode/mcp.json` in source control
- **Exclude** `.vscode/mcp.json.local` for personal/testing configs
- Never commit actual tokens; use the `inputs` section instead

### 2. Security
- Use GitHub Personal Access Tokens, NOT passwords
- Restrict token scopes to minimum needed:
  - `public_repo` - For public repository access only
  - `repo` - For public and private repository access
- Store tokens securely via VS Code's credential manager
- Rotate tokens periodically

### 3. Rate Limiting
- GitHub API has rate limits:
  - **Unauthenticated**: 60 requests per hour per IP
  - **Authenticated**: 5,000 requests per hour per user
- For this teaching project, unauthenticated access is sufficient
- Include token for higher limits if you exceed unauthenticated rates

## MCP Server Types Reference

### HTTP/Remote Servers
```json
{
  "github": {
    "type": "http",
    "url": "https://api.github.com/mcp",
    "headers": {
      "Authorization": "Bearer ${input:github-token}"
    }
  }
}
```
**Use for:** Remote, hosted servers (cloud services, APIs)

### Standard I/O (Local) Servers
```json
{
  "local-server": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-memory"]
  }
}
```
**Use for:** Local processes, CLIs, custom tools

### Docker Containers
```json
{
  "docker-server": {
    "command": "docker",
    "args": ["run", "--rm", "mcp/github"]
  }
}
```
**Use for:** Containerized servers

## Teaching Learning Outcomes

By working with this MCP configuration, students will understand:

1. **Protocol Standards** - How MCP standardizes AI-tool integration
2. **API Integration** - Connecting external services to Copilot
3. **Authentication** - Secure credential management in VS Code
4. **Tool Discovery** - How agents discover and use available tools
5. **Real-World Scenarios** - Practical applications of MCP in development

## Next Steps

### For Learning:
1. Try the example prompts above in Copilot Chat
2. Observe how the GitHub server responds with real data
3. Combine GitHub MCP with local prompts/agents (see COPILOT-GUIDE.md)
4. Create custom agents that use the GitHub server

### For Extension:
1. **Add More Servers:**
   ```json
   {
     "servers": {
       "github": { ... },
       "azure": { "type": "http", "url": "https://api.azure.com/mcp" },
       "playwright": { "command": "npx", "args": ["-y", "@microsoft/mcp-server-playwright"] }
     }
   }
   ```

2. **Create Custom Instructions** that reference the GitHub server:
   - `.github/instructions/github-server-usage.instructions.md`

3. **Build Specialized Agents** that leverage GitHub data:
   - Agent for analyzing Copilot tips from GitHub discussions
   - Agent for finding relevant open issues

## Reference Documentation

- **MCP Specification**: https://modelcontextprotocol.io/
- **GitHub MCP Server**: https://github.com/github/github-mcp-server
- **VS Code MCP Documentation**: https://code.visualstudio.com/docs/copilot/customization/mcp-servers
- **GitHub API Reference**: https://docs.github.com/en/rest

## Troubleshooting

### Server Not Appearing in Tools List
1. Check `.vscode/mcp.json` for syntax errors
2. Verify the URL is correct: `https://api.github.com/mcp`
3. Reload VS Code window (Cmd+Shift+P → "Developer: Reload Window")
4. Check Copilot output for errors

### Authentication Issues
1. Verify GitHub token has correct scopes
2. Token may have expired; generate a new one from GitHub Settings
3. Clear VS Code's credential cache and re-authenticate

### Rate Limiting
1. Add GitHub authentication via the `inputs` section
2. Wait for rate limit window to reset (usually 1 hour)
3. Monitor rate limit headers in MCP server output

---

**Created**: January 6, 2026
**Project**: copilot-tips REST API (O'Reilly Course)
**Purpose**: Teaching MCP server integration with GitHub Copilot
