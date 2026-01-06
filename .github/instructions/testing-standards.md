---
applyTo: "tests/**/*.js"
---

# Testing Standards for Copilot Tips API

## Test File Structure
- Mirror source structure: `src/services/tipService.js` → `tests/services/tipService.test.js`
- One test file per source module
- Use descriptive test names that read like documentation
- Group related tests in `describe()` blocks

```javascript
// ✅ CORRECT
describe('tipService', () => {
  describe('getById', () => {
    it('should return a tip when ID exists as string', async () => {
      // test code
    });
    
    it('should return null when tip ID not found', async () => {
      // test code
    });
  });
  
  describe('getRandom', () => {
    it('should return a different tip on multiple calls', async () => {
      // test code
    });
  });
});
```

## Test Setup & Teardown
- Use `beforeEach()` to reset state before each test
- Clean up test data after tests complete
- Mock file I/O if testing services in isolation
- Use real data for integration tests

```javascript
// ✅ CORRECT
describe('tipService', () => {
  beforeEach(() => {
    // Reset any mocks or test state
  });
  
  afterEach(() => {
    // Clean up resources
  });
});
```

## Assertion Patterns
- Use Chai's `expect()` API (not `assert()`)
- Be specific with assertions: `expect(tip).to.exist`, not just truthy
- Chain assertions for readability
- Include assertion messages for debugging

```javascript
// ✅ CORRECT
expect(tip).to.exist;
expect(tip.id).to.equal('1');
expect(tips).to.be.an('array');
expect(tips).to.have.lengthOf(0);
expect(tips[0]).to.have.property('title');

// ❌ WRONG
expect(tip).to.be.true;  // Imprecise
expect(tips.length).to.be.above(0);  // Use specific methods
```

## HTTP Testing with chai-http
- Use agent pattern for server testing
- Test full request/response cycles
- Verify status codes AND response bodies
- Test error cases (404, 400, 500)

```javascript
// ✅ CORRECT
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /api/tips', () => {
  it('should return all tips as array', (done) => {
    chai.request(app)
      .get('/api/tips')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
  
  it('should return tips with required fields', (done) => {
    chai.request(app)
      .get('/api/tips')
      .end((err, res) => {
        if (res.body.length > 0) {
          const tip = res.body[0];
          expect(tip).to.have.property('id');
          expect(tip).to.have.property('title');
          expect(tip).to.have.property('description');
          expect(tip).to.have.property('topic');
          expect(tip).to.have.property('url');
        }
        done();
      });
  });
});
```

## Testing Edge Cases
- Empty data (0 tips)
- Single item (1 tip)
- Type coercion (string vs numeric IDs)
- Missing fields
- Invalid inputs

```javascript
// ✅ CORRECT
describe('getById', () => {
  it('should find tip by string ID "1"', async () => {
    const tip = await tipService.getById('1');
    expect(tip).to.exist;
  });
  
  it('should find tip by numeric ID 1', async () => {
    const tip = await tipService.getById(1);
    expect(tip).to.exist;
  });
  
  it('should return null for non-existent ID', async () => {
    const tip = await tipService.getById('999');
    expect(tip).to.be.null;
  });
});
```

## Error Case Testing
- Test error handling paths
- Verify graceful degradation
- Check error messages are helpful
- Ensure errors don't crash the application

```javascript
// ✅ CORRECT
describe('readTips', () => {
  it('should return empty array if file missing', async () => {
    // Simulate missing file
    const tips = await tipService.readTips();
    expect(tips).to.be.an('array');
    expect(tips).to.have.lengthOf(0);
  });
  
  it('should handle invalid JSON gracefully', async () => {
    // Mock with invalid JSON
    const tips = await tipService.readTips();
    expect(tips).to.be.an('array');
  });
});
```

## Test Naming Conventions
- Start with action verb: "should return", "should filter", "should create"
- Be specific about inputs and expected outputs
- Include edge case context in test name

```javascript
// ✅ GOOD TEST NAMES
it('should return a random tip when tips exist', async () => {});
it('should return null when no tips exist', async () => {});
it('should filter tips by topic case-insensitively', async () => {});
it('should coerce string and numeric IDs equally', async () => {});

// ❌ BAD TEST NAMES
it('tests getRandom', async () => {});  // Vague
it('works', async () => {});  // Not informative
```

## Async Test Patterns
- Use `async/await` in test functions
- Properly handle promises and async errors
- Don't forget `await` on async service calls

```javascript
// ✅ CORRECT
it('should return a tip by ID', async () => {
  const tip = await tipService.getById('1');
  expect(tip).to.exist;
  expect(tip.id).to.equal('1');
});

// ❌ WRONG
it('should return a tip by ID', () => {
  tipService.getById('1').then(tip => {  // Callback hell
    expect(tip).to.exist;
  });
});

// ❌ WRONG - Missing await
it('should return a tip by ID', async () => {
  const tip = tipService.getById('1');  // No await!
  expect(tip).to.exist;
});
```

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (auto-rerun on changes)
npm run test:watch

# Run specific test file
npm test -- tests/services/tipService.test.js

# Run with coverage report
npm test -- --coverage
```

## Test Coverage Goals
- Aim for 80%+ code coverage
- Prioritize covering service logic (most complex)
- Test all public functions
- Cover happy paths and error cases
- Include integration tests for full workflows

## Example Test File Template

```javascript
import { expect } from 'chai';
import * as tipService from '../../src/services/tipService.js';

describe('tipService', () => {
  describe('getAll', () => {
    it('should return an array of tips', async () => {
      const tips = await tipService.getAll();
      expect(tips).to.be.an('array');
    });
  });

  describe('getRandom', () => {
    it('should return a random tip from the collection', async () => {
      const tip = await tipService.getRandom();
      expect(tip).to.have.property('id');
      expect(tip).to.have.property('title');
    });

    it('should return null if no tips exist', async () => {
      // Mock empty tips scenario
      const tip = await tipService.getRandom();
      // Assertion depends on actual data state
    });
  });

  describe('getById', () => {
    it('should find a tip by string ID', async () => {
      const tip = await tipService.getById('1');
      expect(tip).to.exist;
      expect(tip.id).to.equal('1');
    });

    it('should find a tip by numeric ID', async () => {
      const tip = await tipService.getById(1);
      expect(tip).to.exist;
    });

    it('should return null for non-existent ID', async () => {
      const tip = await tipService.getById('9999');
      expect(tip).to.be.null;
    });
  });

  describe('getByTopic', () => {
    it('should filter tips by topic case-insensitively', async () => {
      const tips = await tipService.getByTopic('shortcuts');
      expect(tips).to.be.an('array');
      tips.forEach(tip => {
        expect(tip.topic.toLowerCase()).to.equal('shortcuts');
      });
    });

    it('should return empty array if no tips match topic', async () => {
      const tips = await tipService.getByTopic('nonexistent');
      expect(tips).to.be.an('array').that.is.empty;
    });
  });
});
```

---

**Testing Philosophy**: Good tests serve as documentation and prevent regressions. They're essential for teaching because they demonstrate expected behavior clearly.
