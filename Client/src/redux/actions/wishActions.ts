import axios from 'axios';
import { LIST_USERS } from '../../utils/constants';
import {setwishList} from "../../redux/reducer/wishReducer"


export const getAllProductInWishList =  (emailUser: string) => async (dispatch: any) => {
    try {
        const wishListResponse = await axios(`${LIST_USERS}?email=${emailUser}`);
        const wishList = await wishListResponse.data;
        dispatch(setwishList(wishList));
    } catch (error) {
        console.log("soy el error wish",error);
    };
};  

