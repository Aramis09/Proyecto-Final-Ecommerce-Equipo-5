
import axios from "axios";
import { LIST_PRODUCT_LIBRARY } from "../utils/constants";

export const getProductsOfLibrary = async (email:string)=> {
    const productsResponse = await axios(`${LIST_PRODUCT_LIBRARY}?email=${email}`);
    const productListLibreary = await productsResponse.data;
    return productListLibreary;
};