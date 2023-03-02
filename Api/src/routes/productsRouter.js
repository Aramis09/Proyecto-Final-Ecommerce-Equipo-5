const {Router}=require("express");
const { getProduct,getProducts } = require("../handlers/productsHandlers");
const productsRouter = Router();

//** Funcion llamar a la funcion que interactua con el modelo y obtiene los datos de la BD */
//** llamr a una funcion que obtenga los datos de la API externa */
//** Unir los datos, unificando el formato requerido por el cliente */
//** Cuando tenga los datos, reponder con los datos obtenidos */
//** No debe interactuar directamente con la BD */

productsRouter.get("/",getProducts);
productsRouter.get("/:id",getProduct);
//productsRouter.post("/",createProductHandler);

module.exports= productsRouter;