
import axios from "axios";
import { REMOVE_PRODUCT_TO_WISHLIST } from "../utils/constants";

export const removeProductToWishList = async (email:string,id:number) => {
    //console.log()("entre")
    const newWishListResponse = await axios(`${REMOVE_PRODUCT_TO_WISHLIST}?user=${email}&product=${id}`);
    const newWishList = await newWishListResponse.data;
    return newWishList;
} ;