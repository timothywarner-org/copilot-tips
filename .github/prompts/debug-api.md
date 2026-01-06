---
description: Debug and test the tips API endpoints
tools: ['search', 'githubRepo']
---

# API Debugging & Testing Guide

You are helping debug and test the Copilot Tips REST API endpoints in a development workflow.

## Project Structure
- Routes: `src/routes/tips.js` - HTTP endpoint definitions
- Controllers: `src/controllers/tipController.js` - Request handlers
- Services: `src/services/tipService.js` - Core business logic with file I/O
- Data: `data/tips.json` - JSON file with tip entries

## Key Debugging Scenarios

### Random Tip Selection Logic
The `getRandom()` function in tipService.js uses `Math.floor(Math.random() * tips.length)` to select a tip. When debugging:
- Verify the tips array is properly loaded and non-empty
- Check that the random index falls within bounds
- Ensure the function returns the actual tip object, not just an index

### Topic Filtering Issues
The `getByTopic()` function performs case-insensitive matching:
- Confirm topic field exists in tips.json entries
- Use `.toLowerCase()` on both sides of comparison
- Return array of matching tips (empty array if no matches)

### ID Type Coercion
Tips support both string and numeric IDs - comparison uses `String(id)` coercion:
- Verify ID exists before retrieving tip
- Handle missing tips gracefully (return null)
- Ensure create/update operations preserve ID uniqueness

## Testing Commands
```bash
npm run dev           # Start server with nodemon
npm test              # Run Mocha test suite
npm run test:watch   # Watch mode testing

# Manual API testing (Thunder Client or curl)
curl http://localhost:3000/api/tips        # Get all
curl http://localhost:3000/api/tips/random # Random tip
curl http://localhost:3000/api/tips/1      # By ID
curl http://localhost:3000/api/tips/topic/shortcuts  # By topic
```

## Error Handling
- Middleware: Check `src/middleware/errorHandler.js` for error formatting
- Async errors: Ensure all promises are properly awaited
- File I/O: Handle read/write failures gracefully with fallbacks

Ask me to:
- Investigate a specific endpoint behavior
- Write tests for a particular function
- Debug async file operations
- Improve error messages