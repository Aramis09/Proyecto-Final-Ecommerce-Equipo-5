import axios from 'axios';

import { listGenres, genresByID, errorMsg } from "../reducer/genresReducer";
import { LIST_GENRES } from "../../utils/constants";


//Obtener listado de generos
export const getListGenres =  () => async (dispatch: any) => {
    let arrayGenres: object[];
    try{
        arrayGenres = (await axios.get(LIST_GENRES)).data;
        dispatch(listGenres(arrayGenres));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - getListGenres: " + error);
    }
}

//Obtener detalle de genero
export const getGenresByID =  (id: string) => async (dispatch: any) => {
    let genres: {};
    try{
        genres = (await axios.get(LIST_GENRES + id)).data;
        dispatch(genresByID(genres));
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        console.log("Exception - getGenresByID: " + error);
    }
}