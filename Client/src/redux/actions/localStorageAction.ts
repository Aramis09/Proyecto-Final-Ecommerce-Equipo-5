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
            const actionPayload = {
                listProductsShoppingCartGuest: shoppingCart.listProductsShoppingCartGuest,
                totalAmount: totalAmount
            }
            dispatch(settingShoppingCartFromLocalStorage(actionPayload));
        }
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    };
};

export const saveShoppingCartInLocalStorage =  (array: object[], totalAmount: number) => () => {
    if(array.length < 1){
        localStorage.clear();
    }else{
        let shoppingCartLS:shoppingCartLocalStorageInterface = {
            listProductsShoppingCartGuest: array,
            totalAmount: totalAmount + ""   
        }
        localStorage.setItem(SHOPPING_CART, JSON.stringify(shoppingCartLS));
        localStorage.setItem(TOTAL_AMOUNT, shoppingCartLS.totalAmount);
    }
}

export const saveShoppingCartLocalStorageInDB =  async (userEmail: string) =>  {
   
        const shoppingCart = JSON.parse(localStorage.getItem(SHOPPING_CART) || "null");

        if(shoppingCart !== null){
            let list = shoppingCart.listProductsShoppingCartGuest;

            let array: object[] = [];
            for(let i=0; i < list.length; i++){
                let obj: object = {UserEmail: userEmail, ProductId: list[i].id};
                array.push(obj);
            };
            const bodyObj = {arrayAllProductInShoppingCart: array};
            let response = (await axios.post(SAVE_SHOPPINGCART_LOCALSTORAGE_IN_DB, bodyObj)).data;

        }
   
}