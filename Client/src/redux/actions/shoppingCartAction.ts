import axios from "axios";

import { 
    addingToShoppingCart, 
    deletingItemShoppingCart, 
    //gettingShoppingCartFromDB, 
    errorMsg, 
    updateShoppingCartUser ,
    eraseGuestShoppingCart,
    userShoppingDBemptyByHand,
} from "../reducer/shoppingCartReducer";
import { useAppSelector } from "../hooks/hooks";

import {ADD_NEW_PRODUCT_IN_SHOPPING_CART, PRODUCTS_LIST_SHOPPING_CART, REMOVE_PRODUCT_IN_SHOPPING_CART} from "../../utils/constants";

export const addShoppingCart =  (game: {}) => async (dispatch: any) => {
    try{
        dispatch(addingToShoppingCart(game));

        //Se procede a grabar en la BD
        // const result = (await axios.post(SAVE_SHOPPING_CART_DB, game)).data;
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

export const deleteItemShoppingCart =  (id: string) => (dispatch: any) => {
    try{
        dispatch(deletingItemShoppingCart(id));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}
/*
export const getShoppingCartFromDB =  (userID: string) => (dispatch: any) => {
    try{
        //Se obtiene el carrito de compras de la BD
        let listProductsShoppingCart: object[] = [];
        dispatch(gettingShoppingCartFromDB(listProductsShoppingCart));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        //console.log()("Exception - addShoppingCart: " + error);
    }
}*/

///////////////////////////////////   USUARIO   ///////////////////////////////////

export const addNewProductInShoppingCart =  (id:any, email:any) => async (dispatch: any) => {
    try{
        await axios.get(ADD_NEW_PRODUCT_IN_SHOPPING_CART + `?email=${email}&idProduct=${id}`);
        let carrito = (await axios.get(PRODUCTS_LIST_SHOPPING_CART + `?email=${email}`)).data;
        dispatch(updateShoppingCartUser(carrito));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

export const removeProductoInShoppingCar =  (id:any, email:any) => async (dispatch: any) => {
    try{
        let carrito = (await axios.get(REMOVE_PRODUCT_IN_SHOPPING_CART + `?email=${email}&idProduct=${id}`)).data;
        dispatch(updateShoppingCartUser(carrito));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}


export const moveProductsFromGuestCartToUserCart = (email:any, carritoGuest:any) => async (dispatch:any) => {
    try{
        carritoGuest.ForEach((item:any) => addNewProductInShoppingCart(item.id, email))
        dispatch(eraseGuestShoppingCart())
    } catch (error) {
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        //console.log()("Exception - moveProductsFromGuestCartToUserCart: " + error);
    }
}

export const getShoppingCartUserFromDB = (email: any) => async(dispatch:any) => {
    try {
        let carrito = (await axios.get(PRODUCTS_LIST_SHOPPING_CART + `?email=${email}`)).data;
            if(carrito.length>0){
                dispatch(userShoppingDBemptyByHand(false));
            } else {
                dispatch(userShoppingDBemptyByHand(true))
            }
        dispatch(updateShoppingCartUser(carrito));
    } catch (error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

