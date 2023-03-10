const {Router} = require("express");
const { getMercadoPagoLink, webhook, responseMP } = require("../../handlers/mercadoPagoHandlers");
const mercadoPagoRouter = Router();

mercadoPagoRouter.post("/new", getMercadoPagoLink);
mercadoPagoRouter.post("/webhook", webhook);
mercadoPagoRouter.get("/responseMP", responseMP);

module.exports = mercadoPagoRouter;