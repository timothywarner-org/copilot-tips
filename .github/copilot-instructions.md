# GitHub Copilot Tips API - AI Agent Instructions

## Project Overview
A REST API for GitHub Copilot tips and best practices built with Node.js, Express, and ES6 modules. Designed as an O'Reilly course demo project to teach debugging and API development with Copilot assistance.

## Architecture & Key Patterns

### Layered Structure
- **Routes** (`src/routes/`) - HTTP endpoint definitions; tips.js handles all /api/tips operations
- **Controllers** (`src/controllers/`) - Request handlers that call services and send responses
- **Services** (`src/services/tipService.js`) - Core business logic; all data operations happen here
- **Middleware** (`src/middleware/`) - Error handling and request/response processing
- **Data** (`data/tips.json`) - Single JSON file source of truth; flexible schema supporting both `{tips: []}` and direct array formats

### Critical Implementation Details
- **ES6 Modules Only**: `"type": "module"` in package.json; use `import/export` syntax throughout
- **File-based Storage**: Uses `fs/promises` for async file operations; handles both array and object-wrapped JSON gracefully
- **Type Coercion**: Tip IDs stored as strings/numbers; comparison uses `String(id)` coercion to support both
- **Topic Filtering**: Case-insensitive matching with `.toLowerCase()` on tip.topic field
- **HTTP Framework**: Express.js with helmet (security), CORS (cross-origin), morgan (logging)

## Development Workflow

### Commands
```bash
npm run dev          # Start with nodemon auto-reload on file changes
npm start           # Production server start
npm test            # Run Mocha tests (mocha tests/**/*.test.js)
npm run test:watch  # Watch mode testing
npm run lint        # ESLint validation
npm run lint:fix    # Auto-fix linting issues
```

### Port Configuration
Default PORT=3000 (set via `.env` or environment variable); server logs startup URL and endpoints.

### API Testing
- **Thunder Client**: VS Code extension with collection at `.vscode/thunder-client/thunderCollection.json` and environment at `.vscode/thunder-client/thunderEnvironment.json`
- **Key Endpoints**: GET /api/tips (all), GET /api/tips/random (single random), GET /api/tips/:id (by ID), GET /api/tips/topic/:topic (by topic)

## Code Conventions

- **Logging**: Include emoji prefixes (`🚀` startup, `💚` health, `⚠️` warnings)
- **Comments**: JSDoc-style block comments for functions and module descriptions
- **Error Handling**: `errorHandler.js` middleware catches and formats errors
- **Configuration**: Load from `.env` using dotenv; never hardcode secrets or ports
- **Testing**: Mocha/Chai with chai-http for assertions; test files mirror src structure

## Data Model
Tips stored with required fields: `id` (string/number), `title`, `description`, `topic`, `url`. Additional fields: `createdAt`, `updatedAt` (ISO timestamps) on create/update operations.

## Teaching Focus
This project prioritizes debugging logic clarity for Copilot assistance—especially the random selection algorithm and topic filtering—over advanced patterns. Keep code readable and comment-heavy for educational value.
