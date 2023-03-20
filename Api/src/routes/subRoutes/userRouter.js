const {Router}=require("express");
const { userList, userID,addNewUser,addNewProductInShoppingCart,addNewFriend,addWish,friendsList,productsListShoppingCart,wishesList,addComment,commentListOfUser,commentListOfProduct,removeProductoInShoppingCar,responseRequestNewFriend,friendsPendingList,addAllProductInShoppingCart,removeWish,searchFriends } = require("../../handlers/usersHanlders");

const userRouter = Router();

//** Funcion llamar a la funcion que interactua con el modelo y obtiene los datos de la BD */
//** llamr a una funcion que obtenga los datos de la API externa */
//** Unir los datos, unificando el formato requerido por el cliente */
//** Cuando tenga los datos, reponder con los datos obtenidos */
//** No debe interactuar directamente con la BD */

userRouter.get("/",userList);
userRouter.get("/userNew",addNewUser);
userRouter.get("/newFriendRequest",addNewFriend);
userRouter.get("/responseRequestFriend",responseRequestNewFriend);
userRouter.get("/friendsConfirmed",friendsList);
userRouter.get("/friendsPending",friendsPendingList);
userRouter.get("/searchFriends",searchFriends);
userRouter.get("/newProductInShoppingCart",addNewProductInShoppingCart);
userRouter.post("/allProductInShoppingCart",addAllProductInShoppingCart);
userRouter.get("/shoppingCart",productsListShoppingCart);   
userRouter.get("/removeProductInShoppingCart",removeProductoInShoppingCar);
userRouter.get("/newWish",addWish);
userRouter.get("/removeWish",removeWish);
userRouter.get("/wishes",wishesList);
userRouter.post("/newComment",addComment);
userRouter.get("/commentUser",commentListOfUser);  
userRouter.get("/commentProduct",commentListOfProduct); 
userRouter.get("/:id",userID);
//lista de compras ya hechas.(facil);
//poder regalar algo a un amigo.(dificil);
//crear rutas de admin. (dificil);
module.exports= userRouter;