import { addingToShoppingCart, deletingItemShoppingCart, gettingShoppingCartFromDB, errorMsg } from "../reducer/shoppingCartReducer";


export const addShoppingCart =  (game: {}) => async (dispatch: any) => {
    try{
        dispatch(addingToShoppingCart(game));

        //Se procede a grabar en la BD
        // const result = (await axios.post(SAVE_SHOPPING_CART_DB, game)).data;
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - addShoppingCart: " + error);
    }
}

export const deleteItemShoppingCart =  (id: string) => (dispatch: any) => {
    try{
        dispatch(deletingItemShoppingCart(id));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - addShoppingCart: " + error);
    }
}

export const getShoppingCartFromDB =  (userID: string) => (dispatch: any) => {
    try{
        //Se obtiene el carrito de compras de la BD
        let listProductsShoppingCart: object[] = [];
        dispatch(gettingShoppingCartFromDB(listProductsShoppingCart));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - addShoppingCart: " + error);
    }
}