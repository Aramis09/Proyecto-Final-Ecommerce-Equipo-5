const {Router} = require("express");
const { getMercadoPagoLink, responseMP } = require("../../handlers/mercadoPagoHandlers"); //, responseMP
const mercadoPagoRouter = Router();

mercadoPagoRouter.post("/new", getMercadoPagoLink);
mercadoPagoRouter.post("/responseMP", responseMP);

module.exports = mercadoPagoRouter;