# Unit Testing Solution for Web Server Assignment

## 📋 Overview

This solution provides a comprehensive unit testing framework for evaluating student-created Node.js TypeScript web servers with mathematical operations. The framework includes:

- ✅ **28 comprehensive test cases** covering all requirements
- ✅ **Example server implementation** for reference
- ✅ **Student instruction guide** with clear requirements
- ✅ **Instructor testing guide** for efficient evaluation
- ✅ **Error handling validation** for edge cases
- ✅ **Performance testing** for large datasets
- ✅ **NPM package integration tests**

## 🚀 Quick Start

### For Students
1. Read `STUDENT_INSTRUCTIONS.md` for complete requirements
2. Implement the server following the example in `src/server.ts`
3. Test locally before publishing to NPM
4. Publish package and submit for evaluation

### For Instructors
1. Install student's NPM package: `npm install student-package-name`
2. Update test imports in `src/test/app.spec.ts`
3. Run tests: `npm test`
4. Review results using `INSTRUCTOR_TESTING_GUIDE.md`

## 📁 Project Structure

```
06-08-2025/
├── src/
│   ├── server.ts                 # Example implementation
│   ├── app.ts                    # Original file (fixed)
│   └── test/
│       └── app.spec.ts           # Comprehensive test suite
├── STUDENT_INSTRUCTIONS.md       # Assignment requirements
├── INSTRUCTOR_TESTING_GUIDE.md   # Evaluation guide
├── example-package.json          # Template for students
├── package.json                  # Project dependencies
├── jest.config.ts               # Jest configuration
└── tsconfig.json                # TypeScript configuration
```

## 🧪 Test Coverage

### Core Functionality (28 tests)
- **Server Health Check** (3 tests)
  - Health endpoint response
  - 404 handling for unknown routes
  - CORS preflight handling

- **Mathematical Operations** (15 tests)
  - **Addition**: positive numbers, negative numbers, decimals, empty array
  - **Subtraction**: multiple numbers, negative results
  - **Multiplication**: multiple numbers, zero handling, decimals
  - **Division**: multiple numbers, decimals, division by zero

- **Error Handling** (6 tests)
  - Invalid JSON payload
  - Missing operation field
  - Missing numbers field
  - Invalid operation type
  - Non-numeric values
  - NaN values

- **HTTP Methods** (2 tests)
  - POST-only enforcement for `/calculate`
  - Correct response headers

- **Performance** (1 test)
  - Large array handling (1000+ numbers)

- **Factory Functions** (2 tests)
  - `createMathServer()` factory
  - `MathServer.create()` static method

## 🎯 Student Requirements

Students must create a TypeScript Node.js server that:

1. **Implements Express-like syntax**:
   ```typescript
   const server = createMathServer(3000);
   server.listen(() => console.log('Server running'));
   ```

2. **Supports mathematical operations** via POST `/calculate`:
   - `sum`: Add all numbers
   - `sub`: Subtract subsequent from first
   - `mul`: Multiply all numbers
   - `div`: Divide first by subsequent

3. **Handles requests/responses**:
   ```json
   // Request
   { "operation": "sum", "numbers": [1, 2, 3, 4, 5] }
   
   // Success Response  
   { "success": true, "result": 15 }
   
   // Error Response
   { "success": false, "error": "Division by zero" }
   ```

4. **Includes proper TypeScript types**:
   ```typescript
   export interface MathOperation {
     operation: 'sum' | 'sub' | 'mul' | 'div';
     numbers: number[];
   }
   ```

5. **Publishes as NPM package** with proper exports

## 📊 Grading Rubric

| Category | Points | Description |
|----------|--------|-------------|
| **Core Functionality** | 40 | All math operations work correctly |
| **Error Handling** | 20 | Proper validation and error responses |
| **Code Quality** | 20 | TypeScript usage, structure, interfaces |
| **API Design** | 10 | HTTP status codes, JSON format, CORS |
| **Package Quality** | 10 | Build process, docs, NPM structure |
| **Total** | **100** | |

## 🔧 Installation & Setup

```bash
# Install dependencies
pnpm install

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Test specific category
npm test -- --testNamePattern="Mathematical Operations"
```

## 🛡️ Error Handling Coverage

The test suite validates handling of:
- ✅ Division by zero
- ✅ Invalid JSON payloads
- ✅ Missing required fields
- ✅ Invalid operation types
- ✅ Non-numeric values in arrays
- ✅ NaN values
- ✅ Empty number arrays
- ✅ Unknown HTTP routes
- ✅ Incorrect HTTP methods

## ⚡ Performance Requirements

- Must handle arrays of 1000+ numbers efficiently
- Response time < 1 second for large operations
- Memory-efficient processing
- Proper cleanup of server resources

## 📦 NPM Package Standards

Students must provide:
- ✅ Compiled JavaScript in `dist/` folder
- ✅ TypeScript declaration files (`.d.ts`)
- ✅ Proper `package.json` with main/types fields
- ✅ README with usage examples
- ✅ Build script that works
- ✅ Semantic versioning

## 🎓 Educational Benefits

This assignment teaches:
- **Node.js HTTP server creation**
- **TypeScript interface design**
- **RESTful API principles**
- **Error handling patterns**
- **NPM package development**
- **Unit testing methodologies**
- **Express-like framework concepts**

## 🆘 Common Issues & Solutions

### Import Errors
```typescript
// Ensure proper exports
export class MathServer { }
export function createMathServer(port?: number): MathServer;
```

### TypeScript Compilation
```bash
# Check tsconfig.json has proper settings
"moduleResolution": "node"
"target": "es2020"
```

### Jest Configuration
```javascript
// Use CommonJS for Jest config
module.exports = { preset: 'ts-jest' };
```

This comprehensive testing solution ensures thorough evaluation of student work while providing clear guidance for both learning and assessment.
