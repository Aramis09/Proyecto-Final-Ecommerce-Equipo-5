import {
    settingShoppingCartFromLocalStorage,
    errorMsg
} from "../reducer/shoppingCartReducer";
import { SHOPPING_CART, TOTAL_AMOUNT, SAVE_SHOPPINGCART_LOCALSTORAGE_IN_DB } from "../../utils/constants";
import { shoppingCartLocalStorageInterface } from "../interfaces/localStorageInterface";
import axios from 'axios';


export const setShoppingCartFromLocalStorage =  () => (dispatch: any) => {
    try{
        const shoppingCart = JSON.parse(localStorage.getItem(SHOPPING_CART) || "null");
        const totalAmount = (localStorage.getItem(TOTAL_AMOUNT) || "null");

        if(shoppingCart !== null){
            console.log("Hay un carrito en el Local Storage");
            const actionPayload = {
                listProductsShoppingCartGuest: shoppingCart.listProductsShoppingCartGuest,
                totalAmount: totalAmount
            }
            console.log("Hay " + actionPayload.listProductsShoppingCartGuest.length + " items en el carrito");
            console.log("El monto total es: " + actionPayload.totalAmount);
            dispatch(settingShoppingCartFromLocalStorage(actionPayload));
        }else{
            console.log("El Local Storage esta vacio");
        }

    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - setShoppingCartFromLocalStorage: " + error);
    }
}

export const saveShoppingCartInLocalStorage =  (array: object[], totalAmount: number) => () => {
    console.log("Entro a saveShoppingCartInLocalStorage");
    if(array.length < 1){
        console.log("Se limpia el local storage");
        localStorage.clear();
    }else{
        let shoppingCartLS:shoppingCartLocalStorageInterface = {
            listProductsShoppingCartGuest: array,
            totalAmount: totalAmount + ""   
        }
    
        console.log("Se graban " + shoppingCartLS.listProductsShoppingCartGuest.length + " productos");
        console.log("El monto total a grabar es: " + shoppingCartLS.totalAmount);
        localStorage.setItem(SHOPPING_CART, JSON.stringify(shoppingCartLS));
        localStorage.setItem(TOTAL_AMOUNT, shoppingCartLS.totalAmount);
    }
}

export const saveShoppingCartLocalStorageInDB =  (userEmail: string) => async(dispatch: any) => {
    try{
        console.log("saveShoppingCartLocalStorageInDB");
        const shoppingCart = JSON.parse(localStorage.getItem(SHOPPING_CART) || "null");

        if(shoppingCart !== null){
            console.log("CONFIRMADO: Hay un carrito en el Local Storage");
            let list = shoppingCart.listProductsShoppingCartGuest;
            console.log("Cantidad de productos en el carrito del local storage: " + list.length);

            let array: object[] = [];
            console.log("1");
            console.log("list.length: " + list.length);
            for(let i=0; i < list.length; i++){
                let obj: object = {UserEmail: userEmail, ProductId: list[i].id};
                array.push(obj);
            };
            const bodyObj = {arrayAllProductInShoppingCart: array};
            console.log("2");
            console.log(bodyObj);
            let response = (await axios.post(SAVE_SHOPPINGCART_LOCALSTORAGE_IN_DB, bodyObj)).data;
            console.log("Respuesta recibida del backend: " + response.length);
            console.log("Se grabo del local storage a la BD");
        }else{
            console.log("El Local Storage esta vacio");
        }

    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - saveShoppingCartLocalStorageInDB: " + error);
    }
}