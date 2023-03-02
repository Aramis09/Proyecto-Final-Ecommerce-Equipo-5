const {Router} = require("express");
const productsRouter = require("./productsRouter");

const mainRouter = Router();

mainRouter.use("/products",productsRouter);

module.exports = mainRouter;