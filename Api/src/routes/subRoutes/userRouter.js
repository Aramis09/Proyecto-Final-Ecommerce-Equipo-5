const {Router}=require("express");
const { userList, userID,addNewUser,addNewProductInShoppingCart,addNewFriend,addWish,friendsList,productsListShoppingCart,wishesList,addComment,commentListOfUser,commentListOfProduct } = require("../../handlers/usersHanlders");

const userRouter = Router();

//** Funcion llamar a la funcion que interactua con el modelo y obtiene los datos de la BD */
//** llamr a una funcion que obtenga los datos de la API externa */
//** Unir los datos, unificando el formato requerido por el cliente */
//** Cuando tenga los datos, reponder con los datos obtenidos */
//** No debe interactuar directamente con la BD */

userRouter.get("/",userList);
userRouter.get("/userNew",addNewUser);
userRouter.get("/newFriend",addNewFriend);
userRouter.get("/friends",friendsList);
userRouter.get("/newProductInShoppingCart",addNewProductInShoppingCart);
userRouter.get("/shoppingCart",productsListShoppingCart);
userRouter.get("/newWish",addWish);
userRouter.get("/wishes",wishesList);
userRouter.get("/newComment",addComment);
userRouter.get("/commentUser",commentListOfUser);  
userRouter.get("/commentProduct",commentListOfProduct); 
userRouter.get("/:id",userID);

module.exports= userRouter;