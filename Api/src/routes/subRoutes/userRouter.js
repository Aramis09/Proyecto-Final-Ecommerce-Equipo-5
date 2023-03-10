const {Router}=require("express");
const { userList, userID,addNewUser,addNewProductInShoppingCart,addNewFriend } = require("../../handlers/usersHanlders");

const userRouter = Router();

//** Funcion llamar a la funcion que interactua con el modelo y obtiene los datos de la BD */
//** llamr a una funcion que obtenga los datos de la API externa */
//** Unir los datos, unificando el formato requerido por el cliente */
//** Cuando tenga los datos, reponder con los datos obtenidos */
//** No debe interactuar directamente con la BD */

userRouter.get("/",userList);
userRouter.get("/userNew",addNewUser);
userRouter.get("/NewFriend",addNewFriend);
userRouter.get("/NewProductInShoppingCart",addNewProductInShoppingCart);
userRouter.get("/:id",userID);

module.exports= userRouter;