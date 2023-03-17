const {Router}=require("express");
const { editProduct,blockUser,makeUserAdmin } = require("../../handlers/adminHandlers");
const adminRouter = Router();

adminRouter.post('/editProduct',editProduct);
adminRouter.post('/blockUser',blockUser);
adminRouter.post('/makeUserAdmin',makeUserAdmin);

module.exports = adminRouter;