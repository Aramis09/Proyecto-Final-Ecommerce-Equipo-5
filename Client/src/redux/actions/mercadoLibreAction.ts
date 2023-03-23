import axios from 'axios';

import { paymentLink, changeResponse } from "../reducer/mercadoLibreReducer";
import { MERCADO_PAGO_LINK } from '../../utils/constants';

export const getPaymentLink = (items: Array<object>, client: object) => async (dispatch:any) => {
    try{
        let response = (await axios.post(MERCADO_PAGO_LINK, {items, client})).data;
        dispatch(paymentLink(response))
    } catch (err) {
        //console.log()('Error en respuesta de mercado pago, a la action getPaymentLink: ', err)
    }
}