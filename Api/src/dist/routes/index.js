"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const productsRouter_1 = require("./products/productsRouter");
exports.mainRouter = (0, express_1.Router)();
exports.mainRouter.use("/products", productsRouter_1.productsRouter);
