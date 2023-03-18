import axios from "axios";
import { ADD_PRODUCT_TO_WISHLIST } from "../utils/constants";

export const addProductToWishList = async (email:string,id:number) => {
    const newWishListResponse = await axios(`${ADD_PRODUCT_TO_WISHLIST}?user=${email}&product=${id}`);
    const newWishList = await newWishListResponse.data;
    console.log(newWishList,"------------------sisoy");
    return newWishList;
} ;