"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
exports.productsRouter = (0, express_1.Router)();
exports.productsRouter.get("/", (req, res) => {
    res.status(200).send("OK");
});
