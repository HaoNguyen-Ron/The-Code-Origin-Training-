# Instructor Testing Guide

This guide explains how to test the NPM packages submitted by your students.

## Testing Setup

### 1. Install Student Package
```bash
# Install the student's published NPM package
npm install student-package-name

# Or install from local file
npm install ./student-package.tgz
```

### 2. Create Test Environment
```bash
# Create a new test directory
mkdir student-test
cd student-test
npm init -y

# Install testing dependencies
npm install --save-dev jest @types/jest supertest @types/supertest typescript ts-jest @types/node

# Install the student's package
npm install student-package-name
```

### 3. Copy Test Files
Copy the test file from this repository:
```bash
cp src/test/app.spec.ts ./test-student-package.spec.ts
```

### 4. Modify Test File
Update the import statement in the test file:
```typescript
// Change this line:
import { MathServer, createMathServer, MathOperation } from '../server';

// To this:
import { MathServer, createMathServer, MathOperation } from 'student-package-name';
```

## Running Tests

### Automated Testing
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test suite
npm test -- --testNamePattern="Mathematical Operations"

# Run in watch mode
npm test -- --watch
```

### Manual Testing
```bash
# Test package installation
node -e "console.log(require('student-package-name'))"

# Test server startup
node -e "
const { createMathServer } = require('student-package-name');
const server = createMathServer(3000);
server.listen(() => console.log('Server started'));
setTimeout(() => process.exit(0), 1000);
"
```

## Grading Rubric

### Core Functionality (40 points)
- [ ] Sum operation works correctly (10 pts)
- [ ] Subtraction operation works correctly (10 pts)
- [ ] Multiplication operation works correctly (10 pts)
- [ ] Division operation works correctly (10 pts)

### Error Handling (20 points)
- [ ] Division by zero handled (5 pts)
- [ ] Invalid JSON handled (5 pts)
- [ ] Invalid operation types handled (5 pts)
- [ ] Missing/invalid numbers array handled (5 pts)

### Code Quality (20 points)
- [ ] Proper TypeScript usage (5 pts)
- [ ] Express-like syntax implemented (5 pts)
- [ ] Clean, readable code structure (5 pts)
- [ ] Proper interfaces and types (5 pts)

### API Design (10 points)
- [ ] Correct HTTP status codes (3 pts)
- [ ] Consistent JSON response format (3 pts)
- [ ] CORS headers implemented (2 pts)
- [ ] Health check endpoint (2 pts)

### Package Quality (10 points)
- [ ] Package builds successfully (3 pts)
- [ ] Proper package.json configuration (2 pts)
- [ ] TypeScript declarations included (2 pts)
- [ ] README with usage examples (3 pts)

## Common Issues to Check

### 1. Import/Export Problems
```typescript
// Students should export these:
export class MathServer { }
export function createMathServer(port?: number): MathServer;
export interface MathOperation { }
```

### 2. Server Lifecycle Management
```typescript
// Check if students properly handle:
server.listen(callback)
server.close(callback)
```

### 3. Mathematical Edge Cases
```typescript
// Test these scenarios:
[1, 2, 3] → sum: 6, sub: -4, mul: 6, div: 0.166...
[10] → sum: 10, sub: 10, mul: 10, div: 10
[] → should throw error
[5, 0] → div should throw error
```

### 4. TypeScript Compilation
```bash
# Check if package compiles correctly
npx tsc --noEmit

# Check type definitions
npm run build && ls dist/*.d.ts
```

## Quick Test Script

Create this script to quickly test any student package:

```javascript
// quick-test.js
const { createMathServer } = require(process.argv[2]);

async function testPackage() {
  const server = createMathServer(0);
  const app = server.listen();
  
  try {
    console.log('✓ Package imports successfully');
    console.log('✓ Server starts successfully');
    
    // You can add more tests here
    console.log('✓ All basic tests passed');
  } catch (error) {
    console.error('✗ Test failed:', error.message);
  } finally {
    server.close(() => process.exit(0));
  }
}

testPackage();
```

Usage:
```bash
node quick-test.js student-package-name
```

## Test Results Interpretation

### All Tests Pass (90-100%)
- Excellent implementation
- Follows all requirements
- Proper error handling
- Good code quality

### Most Tests Pass (70-89%)
- Good implementation
- Minor issues with edge cases
- May have some error handling gaps

### Some Tests Pass (50-69%)
- Basic functionality works
- Significant issues with error handling
- Code quality concerns

### Few Tests Pass (0-49%)
- Major functionality issues
- Poor error handling
- Does not meet requirements

## Feedback Template

```
Student: [Name]
Package: [package-name]
Score: [X]/100

✓ Strengths:
- [List what works well]

⚠ Areas for Improvement:
- [List specific issues]

📝 Detailed Feedback:
- Functionality: [X]/40 - [comments]
- Error Handling: [X]/20 - [comments]
- Code Quality: [X]/20 - [comments]
- API Design: [X]/10 - [comments]
- Package Quality: [X]/10 - [comments]

💡 Suggestions:
- [Specific recommendations]
```

This testing framework provides comprehensive coverage of all requirements and will help you efficiently evaluate student submissions.
