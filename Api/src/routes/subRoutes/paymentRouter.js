const {Router}=require("express");
const  paymentHandler = require("../../handlers/paymentHanlder");
const paymentRouter = Router();


paymentRouter.post('/',paymentHandler);
module.exports = paymentRouter;