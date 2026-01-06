---
applyTo: "**/*.js"
---

# JavaScript/Node.js Code Standards for Copilot Tips API

## Module System & Imports
- Use **ES6 modules only** (`import`/`export`), never CommonJS
- Import paths must be explicit: `import app from './app.js'` (include `.js` extension)
- Use named exports for functions, default exports for app instances
- Group imports: built-ins first, then third-party, then local files

```javascript
// CORRECT
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as tipService from '../services/tipService.js';

// WRONG
const express = require('express');  // CommonJS
import tipService from '../services/tipService.js';  // No .js extension
```

## Async/Await & Promises
- Always use `async/await`, never `.then()` chains
- Handle async errors with try/catch in middleware
- Never forget `await` on async function calls
- Mark functions as `async` if they use `await`

```javascript
// CORRECT
export const getById = async (id) => {
  const tips = await readTips();
  return tips.find(tip => String(tip.id) === String(id));
};

// WRONG
export const getById = (id) => {
  return readTips().then(tips => tips.find(tip => tip.id === id));
};
```

## Function Definitions
- Use arrow functions `() => {}` for callbacks and service methods
- Use named function declarations for middleware and controllers
- Always include JSDoc comments for public functions

```javascript
// CORRECT
/**
 * Get a random tip from the collection
 * @returns {Object} A random tip object or null if no tips exist
 */
export const getRandom = async () => {
  const tips = await readTips();
  if (tips.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * tips.length);
  return tips[randomIndex];
};

// WRONG
export const getRandom = async () => {
  const tips = await readTips();
  return tips[Math.random() * tips.length];  // No bounds check
};
```

## Type Handling & Coercion
- Use `String()` constructor for explicit type conversion (IDs)
- Use `Array.isArray()` to check for arrays
- Check for `.length === 0` instead of falsy checks on arrays
- Use `.toLowerCase()` for case-insensitive string comparison

```javascript
// CORRECT
export const getById = async (id) => {
  const tips = await readTips();
  return tips.find(tip => String(tip.id) === String(id));
};

export const getByTopic = async (topic) => {
  const tips = await readTips();
  return tips.filter(tip => 
    tip.topic?.toLowerCase() === topic.toLowerCase()
  );
};

// WRONG
export const getById = async (id) => {
  return (await readTips()).find(tip => tip.id == id);  // Loose equality
};
```

## Error Handling
- Wrap file I/O in try/catch blocks
- Return graceful defaults (empty array, null) instead of throwing
- Log errors with context before handling
- Let Express error middleware handle HTTP responses

## Logging & Console Output
- Include emoji prefixes for visual clarity
- Log important operations at startup
- Use console.log for structured logging
- Never log sensitive information

## Express Middleware & Routes
- Define routes in separate files under `src/routes/`
- Use router pattern: `const router = express.Router()`
- Controllers should be thin (call service, send response)
- Middleware should handle cross-cutting concerns

## File Operations
- Always use `fs/promises` (async) not sync operations
- Use `fileURLToPath` and `dirname` for `__dirname` in ES6 modules
- Store file paths in module-level constants
- Handle missing files gracefully

## Environment Configuration
- Load env variables with `dotenv` at application start
- Access via `process.env.VARIABLE_NAME`
- Provide sensible defaults
- Never hardcode configuration values

## Testing Patterns
- Use Mocha for test runner
- Use Chai and chai-http for assertions and HTTP testing
- Test files mirror source structure
- Include both happy path and error case tests

## Comments & Documentation
- Use JSDoc for all public functions
- Keep comments updated with code changes
- Comment the "why", not the "what"
- Add comments before complex logic

## JSON Data Structure
- Tips must have: `id`, `title`, `description`, `topic`, `url`
- Create timestamps use ISO format
- Maintain consistent property naming
- Never allow missing required fields

---

**Note**: These standards optimize for teaching clarity, ES6 best practices, and alignment with GitHub Copilot course material.