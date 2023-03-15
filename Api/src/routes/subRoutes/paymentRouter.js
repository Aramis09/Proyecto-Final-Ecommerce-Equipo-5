const {Router}=require("express");
const  paymentHandler = require("../../handlers/paymentHandler");
const paymentRouter = Router();


paymentRouter.post('/',paymentHandler);

module.exports = paymentRouter;