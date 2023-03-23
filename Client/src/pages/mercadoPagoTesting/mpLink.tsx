import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import axios from "axios";
import { MERCADO_PAGO_LINK } from "../../utils/constants";


export const Transaccion = () => {

    let carrito = [{}] //aca deberia de traer los datos del carrito que deberian estar en el store global de redux
    let cliente = {} //aca deberia traer los datos name (con nombre y apellido dentro de este producto) y tambien email
                    //para poder darle estos datos a la ruta axios mas abajo

    const fetchCheckout = async () => {
                
        // data.global is the ID that MP returns from the API, it comes from our backend route
        let redirectLink:any = (await axios.post(MERCADO_PAGO_LINK, {carrito, cliente})).data.response
  
        if(redirectLink.id) {
            const script = document.createElement('script') // Here we create the empty script tag
            script.type = 'text/javascript' // The type of the script
            script.src = 'https://sdk.mercadopago.com/js/v2' // The link where the script is hosted //script.src = 'https://sdk.mercadopago.com/js/v2'
            script.setAttribute('data-preference-id', redirectLink.id) // Here we set its data-preference-id to the ID that the Mercado Pago API gives us
            document.body.appendChild(script) // Here we append it to the body of our page

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            
            // Here we create the button, setting the container, our public key and the ID of the preference that Mercado Pago API returns in its response
            const mp = new window.MercadoPago('TEST-5bbaf9c6-7285-45e4-966a-83819d381b76', {
                locale: 'es-AR'
            })
            // The ".checkout" is the function that creates the connection between the button and the platform
            mp.checkout({
                preference: {
                id: redirectLink.id
                },
                render: {
                container: '.cho-container',
                label: 'Pagar',
                }
            });
        };
    };


    useEffect(() => {//http://localhost:3001/paymant
        // The async function is needed since we can't do async stuff in the top level of our useEffect    
        // Here we just execute the function
        fetchCheckout()
        //eslint-disable-next-line
      }, [])

      
    
    return (
    <div>
        <NavBar/>
        <div>
            <p className="cho-container" ></p>
        </div>
    </div>
    )
}


/*
manolito_cliente:
user: TEST_USER_1585688432
pass: s8Eh7LiWiP

manolito_vendedor:
user: TEST_USER_167492806
pass: ZXmXuKF2b9
*/

/*

*/