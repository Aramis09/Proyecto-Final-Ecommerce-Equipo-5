import axios from 'axios';

import { listPlatforms, platformByID, errorMsg } from "../reducer/platformReducer";
import { LIST_PLATFORMS } from "../../utils/constants";


//Obtener listado de plataformas
export const getListPlatforms =  (name: string) => async (dispatch: any) => {
    let arrayPlatforms: object[];
    try{
        arrayPlatforms = (await axios.get(LIST_PLATFORMS + "?name=" + name)).data;
        dispatch(listPlatforms(arrayPlatforms));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

//Obtener detalle de plataforma
export const getPlatformByID =  (id: string) => async (dispatch: any) => {
    let platform: {};
    try{
        platform = (await axios.get(LIST_PLATFORMS + id)).data;
        dispatch(platformByID(platform));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}