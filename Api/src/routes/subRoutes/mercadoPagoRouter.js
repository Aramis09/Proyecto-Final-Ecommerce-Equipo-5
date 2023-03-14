const {Router} = require("express");
const { getMercadoPagoLink } = require("../../handlers/mercadoPagoHandlers"); //, responseMP
const mercadoPagoRouter = Router();

mercadoPagoRouter.post("/new", getMercadoPagoLink);
//mercadoPagoRouter.get("/responseMP", responseMP);

module.exports = mercadoPagoRouter;