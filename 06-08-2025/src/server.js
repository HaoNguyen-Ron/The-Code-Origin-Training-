"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathServer = void 0;
exports.createMathServer = createMathServer;
var http_1 = require("http");
var url_1 = require("url");
var MathServer = /** @class */ (function () {
    function MathServer(port) {
        if (port === void 0) { port = 3000; }
        this.port = port;
    }
    // Sugar syntax methods like Express.js
    MathServer.prototype.listen = function (callback) {
        this.server = (0, http_1.createServer)(this.handleRequest.bind(this));
        this.server.listen(this.port, callback);
        return this.server;
    };
    MathServer.prototype.close = function (callback) {
        if (this.server) {
            this.server.close(callback);
        }
    };
    MathServer.prototype.handleRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var url, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res.setHeader('Content-Type', 'application/json');
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
                        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                        // Handle CORS preflight
                        if (req.method === 'OPTIONS') {
                            res.statusCode = 200;
                            res.end();
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        url = new url_1.URL(req.url || '', "http://localhost:".concat(this.port));
                        if (req.method === 'GET' && url.pathname === '/') {
                            console.log('hello world');
                            res.statusCode = 200;
                            res.end(JSON.stringify({ message: 'hello world' }));
                            return [2 /*return*/];
                        }
                        if (req.method === 'GET' && url.pathname === '/health') {
                            res.statusCode = 200;
                            res.end(JSON.stringify({ status: 'OK', message: 'Server is running' }));
                            return [2 /*return*/];
                        }
                        if (!(req.method === 'POST' && url.pathname === '/calculate')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.handleCalculation(req, res)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        // 404 for unknown routes
                        res.statusCode = 404;
                        res.end(JSON.stringify({ success: false, error: 'Route not found' }));
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        res.statusCode = 500;
                        res.end(JSON.stringify({
                            success: false,
                            error: error_1 instanceof Error ? error_1.message : 'Internal server error'
                        }));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MathServer.prototype.handleCalculation = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            var _this = this;
            return __generator(this, function (_a) {
                body = '';
                req.on('data', function (chunk) {
                    body += chunk.toString();
                });
                req.on('end', function () {
                    try {
                        var data = JSON.parse(body);
                        var result = _this.performCalculation(data);
                        res.statusCode = 200;
                        res.end(JSON.stringify({ success: true, result: result }));
                    }
                    catch (error) {
                        res.statusCode = 400;
                        res.end(JSON.stringify({
                            success: false,
                            error: error instanceof Error ? error.message : 'Invalid request'
                        }));
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    MathServer.prototype.performCalculation = function (data) {
        var operation = data.operation, numbers = data.numbers;
        if (!Array.isArray(numbers) || numbers.length === 0) {
            throw new Error('Numbers array is required and cannot be empty');
        }
        // Validate all elements are numbers
        if (!numbers.every(function (num) { return typeof num === 'number' && !isNaN(num); })) {
            throw new Error('All elements must be valid numbers');
        }
        switch (operation) {
            case 'sum':
                return numbers.reduce(function (acc, num) { return acc + num; }, 0);
            case 'sub':
                return numbers.reduce(function (acc, num, index) { return index === 0 ? num : acc - num; });
            case 'mul':
                return numbers.reduce(function (acc, num) { return acc * num; }, 1);
            case 'div':
                return numbers.reduce(function (acc, num, index) {
                    if (index === 0)
                        return num;
                    if (num === 0)
                        throw new Error('Division by zero is not allowed');
                    return acc / num;
                });
            default:
                throw new Error("Unsupported operation: ".concat(operation));
        }
    };
    // Express-like sugar syntax
    MathServer.create = function (port) {
        return new MathServer(port);
    };
    return MathServer;
}());
exports.MathServer = MathServer;
// Export factory function for easy use
function createMathServer(port) {
    return MathServer.create(port);
}
