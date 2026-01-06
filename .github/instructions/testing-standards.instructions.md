---
applyTo: "tests/**/*.js"
---

# Testing Standards for Copilot Tips API

## Test File Structure
- Mirror source structure: `src/services/tipService.js` → `tests/services/tipService.test.js`
- One test file per source module
- Use descriptive test names that read like documentation
- Group related tests in `describe()` blocks

## Test Setup & Teardown
- Use `beforeEach()` to reset state before each test
- Clean up test data after tests complete
- Mock file I/O if testing services in isolation
- Use real data for integration tests

## Assertion Patterns
- Use Chai's `expect()` API (not `assert()`)
- Be specific with assertions: `expect(tip).to.exist`, not just truthy
- Chain assertions for readability
- Include assertion messages for debugging

## HTTP Testing with chai-http
- Use agent pattern for server testing
- Test full request/response cycles
- Verify status codes AND response bodies
- Test error cases (404, 400, 500)

## Testing Edge Cases
- Empty data (0 tips)
- Single item (1 tip)
- Type coercion (string vs numeric IDs)
- Missing fields
- Invalid inputs

## Error Case Testing
- Test error handling paths
- Verify graceful degradation
- Check error messages are helpful
- Ensure errors don't crash the application

## Test Naming Conventions
- Start with action verb: "should return", "should filter", "should create"
- Be specific about inputs and expected outputs
- Include edge case context in test name

## Async Test Patterns
- Use `async/await` in test functions
- Properly handle promises and async errors
- Don't forget `await` on async service calls

## Running Tests

```bash
npm test              # Run all tests once
npm run test:watch   # Run tests in watch mode (auto-rerun on changes)
npm test -- tests/services/tipService.test.js  # Run specific test file
```

## Test Coverage Goals
- Aim for 80%+ code coverage
- Prioritize covering service logic (most complex)
- Test all public functions
- Cover happy paths and error cases
- Include integration tests for full workflows

## Testing Best Practices
1. Test in isolation - Start with individual endpoints before workflows
2. Use realistic data - Test with actual tip objects from tips.json
3. Verify state - Check file-based persistence works
4. Document test results - Record which endpoints pass/fail and why

---

**Testing Philosophy**: Good tests serve as documentation and prevent regressions. They're essential for teaching because they demonstrate expected behavior clearly.
