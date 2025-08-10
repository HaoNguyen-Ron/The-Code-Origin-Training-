"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("@gieo/express");
var app = new express_1.default();
app.listen(3000, function () {
    console.log("✅ Server is running at http://localhost:3000");
});
