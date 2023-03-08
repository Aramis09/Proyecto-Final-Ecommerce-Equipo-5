import { addingToShoppingCart, successMsg, errorMsg } from "../reducer/shoppingCartReducer";


export const addShoppingCart =  (game: {}) => async (dispatch: any) => {
    try{
        dispatch(addingToShoppingCart(game));
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