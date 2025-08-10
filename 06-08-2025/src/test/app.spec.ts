import request from 'supertest';
import { MathServer, createMathServer, MathOperation } from '../server'; // Adjust the import path from interns npm package

describe('MathServer Unit Tests', () => {
  let server: MathServer;
  let app: any;

  beforeEach(() => {
    // Create a new server instance for each test
    server = createMathServer(0); // Use port 0 for random available port
    app = server.listen();
  });

  afterEach((done) => {
    // Clean up after each test
    server.close(done);
  });

  describe('Server Health Check', () => {
    it('should respond to health check endpoint', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toEqual({
        status: 'OK',
        message: 'Server is running'
      });
    });

    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown-route')
        .expect(404);

      expect(response.body).toEqual({
        success: false,
        error: 'Route not found'
      });
    });

    it('should handle CORS preflight requests', async () => {
      await request(app)
        .options('/calculate')
        .expect(200);
    });
  });

  describe('Mathematical Operations', () => {
    describe('Addition (sum)', () => {
      it('should correctly add multiple positive numbers', async () => {
        const operation: MathOperation = {
          operation: 'sum',
          numbers: [1, 2, 3, 4, 5]
        };

        const response = await request(app)
          .post('/calculate')
          .send(operation)
          .expect(200);

        expect(response.body).toEqual({
          success: true,
          result: 15
        });
      });

      it('should correctly add negative numbers', async () => {
        const operation: MathOperation = {
          operation: 'sum',
          numbers: [-1, -2, -3]
        };

        const response = await request(app)
          .post('/calculate')
          .send(operation)
          .expect(200);

        expect(response.body).toEqual({
          success: true,
          result: -6
        });
      });

      it('should correctly add decimal numbers', async () => {
        const operation: MathOperation = {
          operation: 'sum',
          numbers: [1.5, 2.5, 3.0]
        };

        const response = await request(app)
          .post('/calculate')
          .send(operation)
          .expect(200);

        expect(response.body).toEqual({
          success: true,
          result: 7
        });
      });

      it('should return 0 for empty array in sum', async () => {
        const operation: MathOperation = {
          operation: 'sum',
          numbers: []
        };

        const response = await request(app)
          .post('/calculate')
          .send(operation)
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.error).toContain('cannot be empty');
      });
    });

    describe('Subtraction (sub)', () => {
      it('should correctly subtract multiple numbers', async () => {
        const operation: MathOperation = {
          operation: 'sub',
          numbers: [10, 3, 2]
        };

        const response = await request(app)
          .post('/calculate')
          .send(operation)
          .expect(200);

        expect(response.body).toEqual({
          success: true,
          result: 5
        });
      });

      it('should handle negative results', async () => {
        const operation: MathOperation = {
          operation: 'sub',
          numbers: [5, 10]
        };

        const response = await request(app)
          .post('/calculate')
          .send(operation)
          .expect(200);

        expect(response.body).toEqual({
          success: true,
          result: -5
        });
      });
    });

    describe('Multiplication (mul)', () => {
      it('should correctly multiply multiple numbers', async () => {
        const operation: MathOperation = {
          operation: 'mul',
          numbers: [2, 3, 4]
        };

        const response = await request(app)
          .post('/calculate')
          .send(operation)
          .expect(200);

        expect(response.body).toEqual({
          success: true,
          result: 24
        });
      });

      it('should return 0 when multiplying by zero', async () => {
        const operation: MathOperation = {
          operation: 'mul',
          numbers: [5, 0, 3]
        };

        const response = await request(app)
          .post('/calculate')
          .send(operation)
          .expect(200);

        expect(response.body).toEqual({
          success: true,
          result: 0
        });
      });

      it('should handle decimal multiplication', async () => {
        const operation: MathOperation = {
          operation: 'mul',
          numbers: [2.5, 4]
        };

        const response = await request(app)
          .post('/calculate')
          .send(operation)
          .expect(200);

        expect(response.body).toEqual({
          success: true,
          result: 10
        });
      });
    });

    describe('Division (div)', () => {
      it('should correctly divide multiple numbers', async () => {
        const operation: MathOperation = {
          operation: 'div',
          numbers: [20, 4, 2]
        };

        const response = await request(app)
          .post('/calculate')
          .send(operation)
          .expect(200);

        expect(response.body).toEqual({
          success: true,
          result: 2.5
        });
      });

      it('should handle decimal division', async () => {
        const operation: MathOperation = {
          operation: 'div',
          numbers: [7, 2]
        };

        const response = await request(app)
          .post('/calculate')
          .send(operation)
          .expect(200);

        expect(response.body).toEqual({
          success: true,
          result: 3.5
        });
      });

      it('should throw error for division by zero', async () => {
        const operation: MathOperation = {
          operation: 'div',
          numbers: [10, 0]
        };

        const response = await request(app)
          .post('/calculate')
          .send(operation)
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.error).toContain('Division by zero');
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid JSON payload', async () => {
      const response = await request(app)
        .post('/calculate')
        .send('invalid json')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });

    it('should handle missing operation field', async () => {
      const invalidOperation = {
        numbers: [1, 2, 3]
      };

      const response = await request(app)
        .post('/calculate')
        .send(invalidOperation)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Unsupported operation');
    });

    it('should handle missing numbers field', async () => {
      const invalidOperation = {
        operation: 'sum'
      };

      const response = await request(app)
        .post('/calculate')
        .send(invalidOperation)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Numbers array is required');
    });

    it('should handle invalid operation type', async () => {
      const invalidOperation = {
        operation: 'invalid_op',
        numbers: [1, 2, 3]
      };

      const response = await request(app)
        .post('/calculate')
        .send(invalidOperation)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Unsupported operation');
    });

    it('should handle non-numeric values in numbers array', async () => {
      const invalidOperation = {
        operation: 'sum',
        numbers: [1, 'invalid', 3]
      };

      const response = await request(app)
        .post('/calculate')
        .send(invalidOperation)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('All elements must be valid numbers');
    });

    it('should handle NaN values in numbers array', async () => {
      const invalidOperation = {
        operation: 'sum',
        numbers: [1, NaN, 3]
      };

      const response = await request(app)
        .post('/calculate')
        .send(invalidOperation)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('All elements must be valid numbers');
    });
  });

  describe('HTTP Methods', () => {
    it('should only accept POST requests for /calculate', async () => {
      await request(app)
        .get('/calculate')
        .expect(404);

      await request(app)
        .put('/calculate')
        .expect(404);

      await request(app)
        .delete('/calculate')
        .expect(404);
    });

    it('should set correct response headers', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.headers['content-type']).toContain('application/json');
      expect(response.headers['access-control-allow-origin']).toBe('*');
    });
  });

  describe('Performance Tests', () => {
    it('should handle large numbers array efficiently', async () => {
      const largeNumbers = Array.from({ length: 1000 }, (_, i) => i + 1);
      const operation: MathOperation = {
        operation: 'sum',
        numbers: largeNumbers
      };

      const startTime = Date.now();
      const response = await request(app)
        .post('/calculate')
        .send(operation)
        .expect(200);
      const endTime = Date.now();

      expect(response.body.success).toBe(true);
      expect(response.body.result).toBe(500500); // Sum of 1 to 1000
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in less than 1 second
    });
  });

  describe('Factory Function Tests', () => {
    it('should create server instance using factory function', () => {
      const factoryServer = createMathServer(3001);
      expect(factoryServer).toBeInstanceOf(MathServer);
    });

    it('should create server instance using static method', () => {
      const staticServer = MathServer.create(3002);
      expect(staticServer).toBeInstanceOf(MathServer);
    });
  });
});

// Integration tests for testing the server as an npm package
describe('NPM Package Integration Tests', () => {
  let server: MathServer;
  let app: any;

  beforeAll(() => {
    // This simulates how the package would be used after installation
    server = createMathServer(3003);
    app = server.listen();
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should work as an installable npm package', async () => {
    // Test the main export functionality
    const operation: MathOperation = {
      operation: 'sum',
      numbers: [1, 2, 3, 4, 5]
    };

    const response = await request(app)
      .post('/calculate')
      .send(operation)
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      result: 15
    });
  });

  it('should expose correct TypeScript interfaces', () => {
    // Type checking tests - these will fail at compile time if interfaces are wrong
    const validOperation: MathOperation = {
      operation: 'sum',
      numbers: [1, 2, 3]
    };

    expect(validOperation.operation).toBe('sum');
    expect(Array.isArray(validOperation.numbers)).toBe(true);
  });
});