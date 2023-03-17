import axios from 'axios';
import {
    addToWishList,
    getWishesList,
    deleteFromWishList,
    error,
} from '../reducer/wishListReducer';
import { ADD_NEW_ITEM_TO_WISH_LIST, GET_WISH_LIST, DELETE_FROM_WISH_LIST } from '../../utils/constants';

export const addItem = (id: string, user: string) => async (dispatch: any) => {
    try {
        const newWish = await axios.get(ADD_NEW_ITEM_TO_WISH_LIST + `?user=${user}&product=${id}`);
        const data = newWish.data;
        dispatch(addToWishList(data));
    } catch (err) {
        dispatch(error("Ocurrió un error...intente mas tarde" + err));
    };
};
/*-----------------------------------------------------------------------------------*/
export const getItems = (email: string) => async (dispatch: any) => {
    try {
        const listWishes = await axios.get(GET_WISH_LIST + `?email=${email}`);
        const data = listWishes.data;
        dispatch(getWishesList(data));
    } catch (err) {
        dispatch(error("Ocurrió un error...intente mas tarde" + err));
    };
};
/*-----------------------------------------------------------------------------------*/
export const deleteItem = (email: string) => async (dispatch: any) => {
    try {

    } catch (err) {
        dispatch(error("Ocurrió un error...intente mas tarde" + err));
    };
};