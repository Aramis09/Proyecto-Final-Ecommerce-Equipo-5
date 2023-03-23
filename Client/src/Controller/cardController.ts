
import axios from "axios";
import { ADD_PRODUCT_TO_WISHLIST } from "../utils/constants";

export const addProductToWishList = async (email:string,id:number) => {
    const newWishListResponse = await axios(`${ADD_PRODUCT_TO_WISHLIST}?user=${email}&product=${id}`);
    const newWishList = await newWishListResponse.data;
    return newWishList;
} ;

export const checkIfProductWasPurchased= async (email:string,productId:number) => {
    const verify = await axios(`http://localhost:3001/products/checkIfProductWasBought?email=${email}&idProduct=${productId}`);
    const verifyBoolean = await verify.data;
    return verifyBoolean;
};


