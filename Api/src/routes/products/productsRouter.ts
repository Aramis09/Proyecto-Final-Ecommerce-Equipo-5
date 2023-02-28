import { Router } from "express";
export const productsRouter = Router();

productsRouter.get("/",(req,res)=>{
    res.status(200).send("OK");
});