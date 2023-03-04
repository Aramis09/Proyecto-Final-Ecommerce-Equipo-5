import axios from 'axios';

import {listProducts, productByID, errorMsg, carouselPicks, productsByFilters, saveTopRatedProducts, searchObject} from "../reducer/productReducer";
import { LIST_PRODUCTS, LIST_PRODUCTS_BY_FILTERS, LIST_PRODUCTS_BY_PLATFORMS } from "../../utils/constants";


//Obtener listado de productos
export const getListProducts =  (name: string) => async (dispatch: any) => {
    let arrayProducts: object[];
    try{
        arrayProducts = (await axios.get(LIST_PRODUCTS + "?name=" + name)).data;
        dispatch(listProducts(arrayProducts));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - getListProducts: " + error);
    }
}

//Obtener listado de productos por filtros
export const getProductsByFilters =  (filters: {}) => async (dispatch: any) => {
    let listProducts: object[];
    try{
        listProducts = (await axios.post(LIST_PRODUCTS_BY_FILTERS, filters)).data;
        dispatch(searchObject(filters))
        dispatch(productsByFilters(listProducts));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - getProductsByFilters: " + error);
    }
}

//Obtener detalle de producto
export const getProductByID =  (id: number) => async (dispatch: any) => {
    let product: {};
    try{
        product = (await axios.get(LIST_PRODUCTS + id)).data;
        dispatch(productByID(product));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - getProdByID: " + error);
    }
}

//Obtiene el listado de los productos mas gustados (esto deposita los datos para el carousel y
//el resto de juegos top que se ve en la pagina principal).
export const getTopRatedProducts =  () => async (dispatch: any) => {
    try{
        let all: object[] = (await axios.get(LIST_PRODUCTS)).data;
        let max: object = {};
        let maxList: object[] = [];
        let turns:number = 0;
        let rest:number = 5;
        while (turns < 9){
            if(maxList.length>0){
                maxList.forEach((item: object) => {
                    all = all.filter((game: object) => game !== item)
                })
            }
            all.forEach((item: any) => {
                let substraction: number = 5 - item.rating;
                if(substraction < rest){
                    rest = substraction;
                    max = item;
                }
            })
            maxList.push(max);
            max = {};
            rest = 5;
            turns++;
        }
        dispatch(carouselPicks(maxList.slice(0, 3)))
        dispatch(saveTopRatedProducts(maxList.slice(3, 9)));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - listProducts: " + error);
    }
}