const {Router} = require("express");
const productsRouter = require("./subRoutes/productsRouter");
const mainRouter = Router();

mainRouter.use("/products",productsRouter);


module.exports = mainRouter;