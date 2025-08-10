"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var server = (0, server_1.createMathServer)(3001);
server.listen(function () {
    console.log('Server is running on http://localhost:3001');
});
