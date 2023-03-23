
import axios from "axios";
import { LIST_PRODUCT_LIBRARY, LIST_PRODUCT_LIBRARY_BY_ID } from "../utils/constants";

export const getProductsOfLibrary = async (email:string)=> {
    const productsResponse = await axios(`${LIST_PRODUCT_LIBRARY}?email=${email}`);
    const productListLibreary = await productsResponse.data;
    return productListLibreary;
};

//creada por cruz
export const getProductsOfLibraryById = async(email:string)=>{
    const productsResponse = await axios(`${LIST_PRODUCT_LIBRARY_BY_ID}/${email}`);
    const productListLibreary = await productsResponse.data;
    console.log('soy la respuesta de libraryController',productListLibreary)
    return productListLibreary;
};
