import { Router } from "express";
import { productsRouter } from "./products/productsRouter";
export const mainRouter = Router();
mainRouter.use("/products",productsRouter);



