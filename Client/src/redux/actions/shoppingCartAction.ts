import axios from "axios";

import { 
    addingToShoppingCart, 
    deletingItemShoppingCart, 
    gettingShoppingCartFromDB, 
    errorMsg, 
    updateShoppingCartUser ,
    eraseGuestShoppingCart
} from "../reducer/shoppingCartReducer";

import {ADD_NEW_PRODUCT_IN_SHOPPING_CART, PRODUCTS_LIST_SHOPPING_CART, REMOVE_PRODUCT_IN_SHOPPING_CART} from "../../utils/constants";

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

///////////////////////////////////   USUARIO   ///////////////////////////////////

export const addNewProductInShoppingCart =  (id:any, email:any) => async (dispatch: any) => { //PROBAR
    try{
        await axios.get(ADD_NEW_PRODUCT_IN_SHOPPING_CART + `?email=${email}&idProduct=${id}`);
        let carrito = (await axios.get(PRODUCTS_LIST_SHOPPING_CART + `?email=${email}`)).data;
        console.log('carrito despues de agregar prods al de usuario', carrito)
        dispatch(updateShoppingCartUser(carrito));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - addNewProductInShoppingCart: " + error);
    }
}

export const removeProductoInShoppingCar =  (id:any, email:any) => async (dispatch: any) => { //PROBAR
    try{
        let carrito = (await axios.get(REMOVE_PRODUCT_IN_SHOPPING_CART + `?email=${email}&idProduct=${id}`)).data;
        //let carrito = (await axios.get(PRODUCTS_LIST_SHOPPING_CART)).data;
        dispatch(updateShoppingCartUser(carrito));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - removeProductoInShoppingCar: " + error);
    }
}

 //PROBAR
export const moveProductsFromGuestCartToUserCart = (email:any, carritoGuest:any) => async (dispatch:any) => {
    try{
        carritoGuest.ForEach((item:any) => addNewProductInShoppingCart(item.id, email))
        dispatch(eraseGuestShoppingCart())
    } catch (error) {
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - moveProductsFromGuestCartToUserCart: " + error);
    }
}
