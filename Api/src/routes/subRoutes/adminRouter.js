const {Router}=require("express");
const { editProduct } = require("../../handlers/adminHandlers");
const adminRouter = Router();

adminRouter.post('/editProduct',editProduct);

module.exports = adminRouter;