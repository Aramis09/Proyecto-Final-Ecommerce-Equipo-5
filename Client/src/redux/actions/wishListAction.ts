import axios from 'axios';
import {
    addToWishList,
    deleteFromWishList,
    addedMsg,
    error,
} from '../reducer/wishListReducer';
import { ADDED_TO_WISH_LIST, ALREADY_IN_THE_WISH_LIST } from '../../utils/constants';

export const addItem = (item: {}) => async (dispatch: any) => {
    try {
        dispatch(addToWishList(item));
    } catch (err) {
        dispatch(error("Ocurrió un error, intentelo mas tarde"));
        console.log("Error on addItem" + err);
    };
};