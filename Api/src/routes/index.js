const {Router} = require("express");
const productsRouter = require("./subRoutes/productsRouter");
const { productOrder } = require("../handlers/productsHandlers.js");

const mainRouter = Router();

mainRouter.use("/products",productsRouter);
mainRouter.use("/order",productOrder);

module.exports = mainRouter;