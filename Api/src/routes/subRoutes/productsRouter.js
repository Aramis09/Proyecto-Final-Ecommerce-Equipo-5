const {Router}=require("express");
const { productsList, productID, productsListByPlatforms, productsListByCategory,productsBuyList,checkIfProductWasBought } = require("../../handlers/productsHandlers");
const productsRouter = Router();

//** Funcion llamar a la funcion que interactua con el modelo y obtiene los datos de la BD */
//** llamr a una funcion que obtenga los datos de la API externa */
//** Unir los datos, unificando el formato requerido por el cliente */
//** Cuando tenga los datos, reponder con los datos obtenidos */
//** No debe interactuar directamente con la BD */

productsRouter.get("/",productsList);
productsRouter.get("/platforms",productsListByPlatforms);
productsRouter.post("/multiple",productsListByCategory);
productsRouter.get("/productsBuy",productsBuyList);
productsRouter.get("/checkIfProductWasBought",checkIfProductWasBought);
productsRouter.get("/:id",productID);

//productsRouter.post("/",createProductHandler);

module.exports= productsRouter;