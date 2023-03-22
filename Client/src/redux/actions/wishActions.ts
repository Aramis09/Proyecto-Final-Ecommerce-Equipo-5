
import axios from 'axios';
import { LIST_WISH } from '../../utils/constants';
import {setwishList} from "../../redux/reducer/wishReducer"


export const getAllProductInWishList =  (emailUser: string) => async (dispatch: any) => {
    try {
        const wishListResponse = await axios(`${LIST_WISH}?email=${emailUser}`);
        const wishList = await wishListResponse.data;
        dispatch(setwishList(wishList));
    } catch (error) {
        //console.log()("soy el error wish",error);
    };
};  


