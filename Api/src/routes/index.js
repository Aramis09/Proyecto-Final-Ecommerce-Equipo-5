const {Router} = require("express");
const productsRouter = require("./subRoutes/productsRouter");
const platformsRouter = require("./subRoutes/platformsRouter");
const genresRouter = require("./subRoutes/genresRouter");
const loginRouter = require("./subRoutes/loginRouter");
const mainRouter = Router();

mainRouter.use("/",loginRouter);
mainRouter.use("/products",productsRouter);
mainRouter.use("/platforms",platformsRouter);
mainRouter.use("/genres",genresRouter);

module.exports = mainRouter;