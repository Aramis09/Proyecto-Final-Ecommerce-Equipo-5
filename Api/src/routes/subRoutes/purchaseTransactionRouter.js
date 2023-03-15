const {Router}=require("express");
const { purchaseList, purchaseByUserID, purchaseCreate } = require("../../handlers/purchaseTransactionHandlers");
const purchaseRouter = Router();

purchaseRouter.get("/",purchaseList);
purchaseRouter.get("/:id",purchaseByUserID);
purchaseRouter.post("/create",purchaseCreate);

module.exports= purchaseRouter;