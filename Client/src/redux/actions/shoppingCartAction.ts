import { addingToShoppingCart, deletingItemShoppingCart, successMsg, errorMsg } from "../reducer/shoppingCartReducer";


export const addShoppingCart =  (game: {}) => async (dispatch: any) => {
    try{
        dispatch(addingToShoppingCart(game));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - addShoppingCart: " + error);
    }
}

export const deleteItemShoppingCart =  (id: string) => async (dispatch: any) => {
    try{
        console.log("deleteItemShoppingCart - id:" + id);
        dispatch(deletingItemShoppingCart(id));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - addShoppingCart: " + error);
    }
}

export const setSuccessMsg =  (msg: string) => async (dispatch: any) => {
    try{
        dispatch(successMsg(msg));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - addShoppingCart: " + error);
    }
}