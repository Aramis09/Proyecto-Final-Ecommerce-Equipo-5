const {Router} = require("express");
const productsRouter = require("./subRoutes/productsRouter");
const platformsRouter = require("./subRoutes/platformsRouter");
const genresRouter = require("./subRoutes/genresRouter");
const paymentRouter = require("./subRoutes/paymentRouter");
const mainRouter = Router();

mainRouter.use("/products",productsRouter);
mainRouter.use("/platforms",platformsRouter);
mainRouter.use("/genres",genresRouter);
mainRouter.use("/paymant",paymentRouter);

module.exports = mainRouter;