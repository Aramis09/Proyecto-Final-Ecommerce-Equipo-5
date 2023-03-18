import axios from 'axios';

import { listUser, userByID, errorMsg,  } from "../reducer/userReducer";
import {  LIST_USERS } from "../../utils/constants";


//Obtener listado de plataformas
export const getListUsers =  () => async (dispatch: any) => {
    let arrayUsers: object[];
    try{
        arrayUsers = (await axios.get(LIST_USERS)).data;
        dispatch(listUser(arrayUsers));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - getListUser: " + error);
    }
}

//Obtener detalle de plataforma
export const getUserByID =  (id: string) => async (dispatch: any) => {
    let user: {};
    try{
        user = await  (await axios.get(LIST_USERS + id)).data;
        dispatch(userByID(user));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - getUserByID: " + error);
    }
}