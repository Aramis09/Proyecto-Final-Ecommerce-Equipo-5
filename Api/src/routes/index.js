const {Router} = require("express");
const productsRouter = require("./subRoutes/productsRouter");
const platformsRouter = require("./subRoutes/platformsRouter");
const genresRouter = require("./subRoutes/genresRouter");
const mercadoPagoRouter = require("./subRoutes/mercadoPagoRouter");
const userRouter = require("./subRoutes/userRouter");
const giftRouter = require("./subRoutes/giftRouter");
const purchaseTransactionRouter = require("./subRoutes/purchaseTransactionRouter");

const adminRouter = require("./subRoutes/adminRouter"); 

//const paymentRouter = require("./subRoutes/paymentRouter");
const mainRouter = Router();

mainRouter.use("/products",productsRouter);
mainRouter.use("/genres",genresRouter);
mainRouter.use("/user",userRouter);
mainRouter.use("/admin",adminRouter);
mainRouter.use("/gift",giftRouter);
mainRouter.use("/payment", mercadoPagoRouter); //paymentRouter (esto comentado es zona de testeo)
mainRouter.use("/purchase",purchaseTransactionRouter);


module.exports = mainRouter;