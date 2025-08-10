# Math Server Assignment - Student Instructions

## Objective
Create a TypeScript Node.js web server that performs mathematical operations (sum, subtraction, multiplication, division) with Express-like syntax and publish it as an NPM package.

## Requirements

### 1. Server Implementation
- ✅ Use Node.js HTTP module with TypeScript
- ✅ Create Express-like sugar syntax (similar to `app.listen()`)
- ✅ Handle POST requests to `/calculate` endpoint
- ✅ Support mathematical operations: sum, sub, mul, div
- ✅ Use rest parameters (arrays) for numbers
- ✅ Return JSON responses
- ✅ Include proper error handling

### 2. Mathematical Operations
Your server should handle these operations via POST requests:

```json
{
  "operation": "sum",
  "numbers": [1, 2, 3, 4, 5]
}
```

**Supported Operations:**
- `sum`: Add all numbers together
- `sub`: Subtract subsequent numbers from the first
- `mul`: Multiply all numbers together  
- `div`: Divide the first number by subsequent numbers

### 3. API Endpoints

#### Health Check
```
GET /health
Response: { "status": "OK", "message": "Server is running" }
```

#### Calculate
```
POST /calculate
Body: { "operation": "sum|sub|mul|div", "numbers": [number, number, ...] }
Success Response: { "success": true, "result": number }
Error Response: { "success": false, "error": "error message" }
```

### 4. Express-like Sugar Syntax
Your server class should provide:
```typescript
const server = createMathServer(3000);
server.listen(() => {
  console.log('Server running...');
});
```

### 5. NPM Package Structure
```
your-package/
├── src/
│   ├── server.ts          # Main server implementation
│   └── types.ts           # TypeScript interfaces (optional)
├── dist/                  # Compiled JavaScript (auto-generated)
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

### 6. Required Exports
Your main file should export:
```typescript
export class MathServer { /* implementation */ }
export function createMathServer(port?: number): MathServer;
export interface MathOperation { /* interface */ }
```

## Example Implementation Template

```typescript
import { createServer, IncomingMessage, ServerResponse } from 'http';

export interface MathOperation {
  operation: 'sum' | 'sub' | 'mul' | 'div';
  numbers: number[];
}

export class MathServer {
  // Your implementation here
  public listen(callback?: () => void) {
    // Create and start HTTP server
  }
  
  public close(callback?: () => void) {
    // Close server
  }
  
  private handleRequest(req: IncomingMessage, res: ServerResponse) {
    // Handle HTTP requests
  }
  
  private performCalculation(data: MathOperation): number {
    // Implement math operations
  }
}

export function createMathServer(port?: number): MathServer {
  return new MathServer(port);
}
```

## Testing Requirements

Your package will be tested using these scenarios:
- ✅ Health check endpoint
- ✅ All mathematical operations with various inputs
- ✅ Error handling (division by zero, invalid input, etc.)
- ✅ CORS support
- ✅ JSON request/response handling
- ✅ Performance with large number arrays
- ✅ NPM package installation and usage

## Submission Checklist

- [ ] Server implements all required mathematical operations
- [ ] Express-like syntax (`createMathServer()`, `.listen()`)
- [ ] Proper TypeScript types and interfaces
- [ ] Error handling for edge cases
- [ ] Package builds successfully (`npm run build`)
- [ ] Published to NPM registry
- [ ] README with usage examples
- [ ] Package can be installed and imported

## NPM Publishing Steps

1. **Build your package:**
   ```bash
   npm run build
   ```

2. **Test locally:**
   ```bash
   npm link
   # In test directory:
   npm link your-package-name
   ```

3. **Publish to NPM:**
   ```bash
   npm login
   npm publish
   ```

## Evaluation Criteria

1. **Functionality (40%)** - All math operations work correctly
2. **Code Quality (20%)** - Clean, readable TypeScript code
3. **Error Handling (20%)** - Proper validation and error responses
4. **API Design (10%)** - RESTful design and consistent responses
5. **Package Quality (10%)** - Proper NPM package structure and documentation

## Example Usage After Installation

```typescript
import { createMathServer } from 'your-package-name';

const server = createMathServer(3000);

server.listen(() => {
  console.log('Math server is running on port 3000');
});

// Client usage:
// POST /calculate
// { "operation": "sum", "numbers": [1, 2, 3, 4, 5] }
// Response: { "success": true, "result": 15 }
```

Good luck with your implementation!
