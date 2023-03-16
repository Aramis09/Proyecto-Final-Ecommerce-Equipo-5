const {Router}=require("express");
const { editProduct,blockUser,makeUserAdmin } = require("../../handlers/adminHandlers");
const adminRouter = Router();

adminRouter.put('/editProduct',editProduct);
adminRouter.put('/blockUser',blockUser);
adminRouter.put('/makeUserAdmin',makeUserAdmin);

module.exports = adminRouter;