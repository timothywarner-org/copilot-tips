# Copilot Instructions Guide

This repository contains comprehensive Copilot instructions, prompt files, custom agents, and coding standards to help AI coding agents be immediately productive when working on the copilot-tips API project.

## Structure

### Core Instructions
- **[.github/copilot-instructions.md](.github/copilot-instructions.md)** - Main AI agent guidance covering architecture, patterns, workflows, and conventions

### Prompt Files (`.github/prompts/`)
Reusable prompts for specific tasks in Copilot Chat:

1. **[create-tip.md](.github/prompts/create-tip.md)**
   - Generate new GitHub Copilot tips for the database
   - Guides AI through tip structure and quality standards
   - Includes topic categories and best practices

2. **[debug-api.md](.github/prompts/debug-api.md)**
   - Debug and test API endpoints
   - Key debugging scenarios (random selection, topic filtering, ID coercion)
   - Test commands and error handling guidance

3. **[plan-feature.md](.github/prompts/plan-feature.md)**
   - Feature planning without code
   - Handoff to implementation agent when ready
   - Comprehensive planning template and success criteria

### Custom Agents (`.github/agents/`)
Specialized AI agents configured with tools and instructions:

1. **[tip-creator.md](.github/agents/tip-creator.md)**
   - Expert agent for creating and validating Copilot tips
   - Handles research, validation, and formatting
   - Enforces quality standards and documentation links
   - Handoff to database agent for persistence

2. **[api-tester.md](.github/agents/api-tester.md)**
   - Expert agent for API testing and validation
   - Tests all endpoints and edge cases
   - Covers error handling and code quality checks
   - Handoff to fix issues agent when problems found

### Coding Standards (`.github/instructions/`)
Detailed style guides for specific aspects of the project:

1. **[javascript-standards.md](.github/instructions/javascript-standards.md)** (`applyTo: "**/*.js"`)
   - ES6 modules and imports
   - Async/await patterns
   - Function definitions and JSDoc
   - Type handling and coercion
   - Error handling and logging
   - Express middleware and routing
   - File operations and configuration
   - Testing patterns
   - Comments and documentation
   - JSON data structure rules

2. **[testing-standards.md](.github/instructions/testing-standards.md)** (`applyTo: "tests/**/*.js"`)
   - Test file structure and organization
   - Assertion patterns and chai usage
   - HTTP testing with chai-http
   - Edge case and error case testing
   - Test naming conventions
   - Async test patterns
   - Coverage goals and best practices

## How to Use These Files

### For Copilot Chat Users
1. **Reference prompt files directly** - Copy the prompt into Copilot Chat and fill in specific details
2. **Use custom agents** - Select from the @agents menu when planning features or creating tips
3. **Follow instructions** - The `.github/instructions/` files automatically apply to relevant files via glob patterns

### For Agent Mode
1. **Provide context** - Reference these files in your prompts to guide autonomous agents
2. **Use handoffs** - Custom agents include handoff actions to transition between agents
3. **Trust the standards** - Agents are instructed to follow all applicable standards

### VS Code Configuration
Enable automatic instruction application in `.vscode/settings.json`:

```json
{
  "github.copilot.chat.codeGeneration.useInstructionFiles": true
}
```

## Key Project Context

### Architecture
- **Layered Pattern**: Routes → Controllers → Services
- **Data**: JSON file-based (`data/tips.json`)
- **Testing**: Mocha/Chai with chai-http
- **Stack**: Express.js, ES6 modules, nodemon (dev)

### Teaching Focus
- This is an O'Reilly course project on GitHub Copilot
- Emphasizes debugging and understanding AI assistance
- Prioritizes code clarity for educational value
- Demonstrates Node.js and Express best practices

### Debugging Priorities
- **Random tip selection** - Tests algorithmic correctness
- **Topic filtering** - Case-insensitive matching patterns
- **ID type coercion** - String vs numeric handling
- **File I/O** - Async operations and error handling

## File Naming Patterns

Use these when creating new files or referencing in code:

```
.github/
├── copilot-instructions.md        # Main guidance (required)
├── prompts/
│   ├── create-tip.md              # Tip creation workflow
│   ├── debug-api.md               # API debugging guide
│   └── plan-feature.md            # Feature planning
├── agents/
│   ├── tip-creator.md             # Tip creation agent
│   └── api-tester.md              # API testing agent
└── instructions/
    ├── javascript-standards.md    # JS/Node.js standards
    └── testing-standards.md       # Mocha/Chai standards
```

## Example: Getting Help from Copilot

### Creating a New Tip
```
@tip-creator
Create a tip about using Copilot Agent Mode for autonomous tasks
Target audience: intermediate developers
Real-world use case: Building full features end-to-end
```

### Testing an Endpoint
```
@api-tester
Test the GET /api/tips/random endpoint
Include edge cases for empty tips array
```

### Planning a Feature
```
@plans-feature
Feature: Add full-text search across tip titles and descriptions
Include implementation steps and testing requirements
```

## Reference Documentation

- **VS Code Copilot**: https://code.visualstudio.com/docs/copilot
- **GitHub Copilot Docs**: https://docs.github.com/copilot
- **Prompt Engineering Guide**: https://code.visualstudio.com/docs/copilot/guides/prompt-engineering-guide
- **Custom Agents**: https://code.visualstudio.com/docs/copilot/customization/custom-agents

## Contributing New Instructions

When adding new prompt files, agents, or standards:

1. **Follow naming conventions** - Use descriptive kebab-case names
2. **Include YAML frontmatter** - Specify description, tools, and applicable glob patterns
3. **Link to examples** - Show concrete code examples from the project
4. **Test with agents** - Verify the instruction works in practice
5. **Document in this guide** - Add references here with brief descriptions

---

Last updated: January 6, 2026  
For the copilot-tips REST API teaching project
