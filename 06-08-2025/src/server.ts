import { createServer, IncomingMessage, ServerResponse as HttpServerResponse } from 'http';
import { URL } from 'url';

export interface MathOperation {
  operation: 'sum' | 'sub' | 'mul' | 'div';
  numbers: number[];
}

export interface MathServerResponse {
  success: boolean;
  result?: number;
  error?: string;
}

export class MathServer {
  private server: any;
  
  constructor(public port: number = 3000) {}

  // Sugar syntax methods like Express.js
  public listen(callback?: () => void) {
    this.server = createServer(this.handleRequest.bind(this));
    this.server.listen(this.port, callback);
    return this.server;
  }

  public close(callback?: () => void) {
    if (this.server) {
      this.server.close(callback);
    }
  }

  private async handleRequest(req: IncomingMessage, res: HttpServerResponse) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      res.end();
      return;
    }

    try {
      const url = new URL(req.url || '', `http://localhost:${this.port}`);
      
      if (req.method === 'GET' && url.pathname === '/health') {
        res.statusCode = 200;
        res.end(JSON.stringify({ status: 'OK', message: 'Server is running' }));
        return;
      }

      if (req.method === 'POST' && url.pathname === '/calculate') {
        await this.handleCalculation(req, res);
        return;
      }

      // 404 for unknown routes
      res.statusCode = 404;
      res.end(JSON.stringify({ success: false, error: 'Route not found' }));
      
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      }));
    }
  }

  private async handleCalculation(req: IncomingMessage, res: HttpServerResponse) {
    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data: MathOperation = JSON.parse(body);
        const result = this.performCalculation(data);
        
        res.statusCode = 200;
        res.end(JSON.stringify({ success: true, result }));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ 
          success: false, 
          error: error instanceof Error ? error.message : 'Invalid request' 
        }));
      }
    });
  }

  private performCalculation(data: MathOperation): number {
    const { operation, numbers } = data;

    if (!Array.isArray(numbers) || numbers.length === 0) {
      throw new Error('Numbers array is required and cannot be empty');
    }

    // Validate all elements are numbers
    if (!numbers.every(num => typeof num === 'number' && !isNaN(num))) {
      throw new Error('All elements must be valid numbers');
    }

    switch (operation) {
      case 'sum':
        return numbers.reduce((acc, num) => acc + num, 0);
      
      case 'sub':
        return numbers.reduce((acc, num, index) => index === 0 ? num : acc - num);
      
      case 'mul':
        return numbers.reduce((acc, num) => acc * num, 1);
      
      case 'div':
        return numbers.reduce((acc, num, index) => {
          if (index === 0) return num;
          if (num === 0) throw new Error('Division by zero is not allowed');
          return acc / num;
        });
      
      default:
        throw new Error(`Unsupported operation: ${operation}`);
    }
  }

  // Express-like sugar syntax
  public static create(port?: number): MathServer {
    return new MathServer(port);
  }
}

// Export factory function for easy use
export function createMathServer(port?: number): MathServer {
  return MathServer.create(port);
}
