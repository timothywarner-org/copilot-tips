# GitHub Copilot Tips API

A REST API for GitHub Copilot tips and best practices, built with Node.js and Express using ES6 modules.

## Features

- RESTful API endpoints for Copilot tips
- Get tips by ID, topic, or randomly
- CRUD operations for tips management
- JSON file-based data persistence
- Error handling middleware
- Health check endpoint
- CORS support
- Security headers with Helmet
- ES6 module syntax throughout

## Prerequisites

- Node.js 18.x or higher
- npm

## Installation

```bash
npm install
```

## Usage

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

### Testing

Tests are written using Mocha and Chai with chai-http for HTTP assertions.

```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Linting

```bash
npm run lint
```

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | /api/tips             | Get all tips             |
| GET    | /api/tips/random      | Get a random tip         |
| GET    | /api/tips/:id         | Get tip by ID            |
| GET    | /api/tips/topic/:topic| Get tips by topic        |
| POST   | /api/tips             | Create new tip           |
| PUT    | /api/tips/:id         | Update tip               |
| DELETE | /api/tips/:id         | Delete tip               |
| GET    | /health               | Health check             |

See [docs/API.md](docs/API.md) for full API documentation.

## API Testing with Thunder Client

This project includes Thunder Client configuration for VS Code:

1. Install the Thunder Client extension (`rangav.vscode-thunder-client`)
2. Open Thunder Client from the sidebar
3. Import the collection from `.vscode/thunder-client/thunderCollection.json`
4. Import the environment from `.vscode/thunder-client/thunderEnvironment.json`
5. Select "Local Development" environment
6. Run requests against your local server

## Project Structure

```
.
|-- .github/workflows/  # CI/CD configuration
|-- .vscode/            # VS Code settings & Thunder Client configs
|-- data/               # Data storage (tips.json)
|-- docs/               # Documentation
|-- src/
|   |-- controllers/    # Request handlers
|   |-- middleware/     # Express middleware
|   |-- routes/         # Route definitions
|   |-- services/       # Business logic
|   |-- app.js          # Express app setup
|   +-- index.js        # Entry point
+-- tests/              # Mocha/Chai test files
```

## Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Module System**: ES6 Modules
- **Testing**: Mocha + Chai + chai-http
- **API Testing**: Thunder Client (VS Code extension)

## License

MIT
