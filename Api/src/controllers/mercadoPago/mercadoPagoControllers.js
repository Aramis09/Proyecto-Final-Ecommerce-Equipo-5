const { access_token } = require("./keysAndTokensMP"); //CAMBIAR A .ENV!!!
const mercadopago = require("mercadopago");


const createPaymentMercadoPago = async (items, client) => { //async/await?

    let clientName; 
    let clientSurname;
    let clientFullName = selectNameSurname(client);
    clientName = clientFullName.clientName;
    clientSurname = clientFullName.clientSurname;
    //console.log('client name surname', clientName, clientSurname)

    items = reshapeProductInItems(items);
    //console.log('b', items)
    //luego deberia mandar al array con detalles a la funcion createPaymentMercadoPago.
    const preference = {
        items,
        external_reference: "Proyecto E-commerce - Henry Grupo V - FT33-b", //podemos poner cualquier cosa aca
        payer: {
            name: clientName,
            surname: clientSurname,
            email: client.email,
            phone: {
                area_code: "11",
                number: 22223333
            },
            address: {
                zip_code: "1234",
                street_name: "calle falsa",
                street_number: 123
            }
        },
        payment_methods: {
            // declaramos el método de pago y sus restricciones
            default_payment_method_id: 'naranja',
            excluded_payment_methods: [
                {
                    "id": "cobroexpress",
                }
            ], // aca podemos excluir metodos de pagos, tengan en cuenta que es un array de objetos, ej: //excluded_payment_methods: [{id: "amex"}], amex siendo american express.
            excluded_payment_types: [
                {
                    "id": "atm",
                }
            ], // aca podemos excluir TIPOS de pagos, es un array de objetos, ejemplo: excluded_payment_types: [{ id: "atm" }], 
            
            installments: 1, // limite superior de cantidad de cuotas permitidas //lo dejo en uno por el momento
            default_installments: 1 // la cantidad de cuotas que van a aparecer por defecto //lo dejo en uno por el momento
        },
        back_urls: {
            // declaramos las urls de redireccionamiento
            //success: "https://localhost:3001/payment/response",
            success: "https://localhost:3001/payment/responseMP", //esto es de prueba, despues lo cambio
            // url que va a redireccionar si sale todo bien
            //pending: "https://localhost:3001/payment/pending",
            pending: "https://localhost:3001/payment/responseMP", //esto es de prueba, despues lo cambio
            // url a la que va a redireccionar si decide pagar en efectivo por ejemplo
            //failure: "https://localhost:3001/payment/error"
            failure: "https://localhost:3001/payment/responseMP" //esto es de prueba, despues lo cambio
            // url a la que va a redireccionar si falla el pago
        },
        binary_mode: true,
        notification_url: "https://localhost:3001/payment/webhook", // declaramos nuestra url donde recibiremos las notificaciones
        auto_return: "approved", // si la compra es exitosa automaticamente redirige a "success" de back_urls
        redirect_urls: { failure: 'https://www.google.com/', pending: 'https://www.google.com/', success: 'https://www.google.com/' } //en testeo
    }

    

    try {
        mercadopago.configure({
            access_token: access_token
        });
        const response = await mercadopago.preferences.create(preference);
        //console.log('rrr', response)
        return response
    } catch (err) {
        console.log('error createPaymentMP', err)
    }
}

const selectNameSurname = (client) => {

    let clientName; 
    let clientSurname;
    let clientFullName = client.name.split(' ');
    //console.log('clientFullName', clientFullName)
    if(clientFullName.length === 2){
        clientName = clientFullName[0];
        clientSurname = clientFullName[1];
    }
    if(clientFullName.length === 3){
        clientName = clientFullName.slice(0, 2).join(' ');
        clientSurname = clientFullName[2];
    }
    if(clientFullName.length === 4){
        clientName = clientFullName.slice(0, 2).join(' ');
        clientSurname = clientFullName.slice(2, 4).join(' ');
    }
    if(clientFullName.length > 4){
        clientName = clientFullName.slice(0, clientFullName.length-2).join(' ');
        clientSurname = clientFullName.slice(clientFullName.length-2, clientFullName.length).join(' ');
    }
    //console.log('cc', clientName, clientSurname)
    return {clientName, clientSurname}
}

const reshapeProductInItems = (items) => {

    let itemsReady = items.map(item => {
        return {
            id: item.id,
            title: item.name,
            picture_url: item.background_image,
            unit_price: parseFloat(item.price),
            description: item.description,
            category_id: "virtualKey", //needed
            quantity: 1, //needed
            currency_id: "USD", //needed
        }

        //return {
        //    title: item.name,
        //    unit_price: parseFloat(item.price),
        //    quantity: 1, //needed
        //}
    })
    //console.log('a', items)
    return itemsReady

}



module.exports = {
    createPaymentMercadoPago
}


//NOTAS:

/* este es el array ITEMS que tiene que llevar los siguientes elementos:
    id: id,
    title:name,
    description: :l,
    picture_url: imagen principal,
    category_id: "virtualKey",
    quantity: parseInt(unit),
    currency_id: "ARS",
    unit_price: parseFloat(price)
*/


/* NO BORRAR
                //excluded_payment_methods
                {
                    "id":"credit_card"
                },
                {
                    "id":"debit_card"
                },
                {
                    "id":"prepaid_card"
                },
                {
                    "id":"ticket"
                },
                {
                    "id":"atm"
                }


                //excluded_payment_types
                {
                    "id": "master"
                },
                {
                    "id": "naranja"
                },
                {
                    "id": "cabal"
                },
                {
                    "id": "argencard"
                },
                {
                    "id": "tarshop"
                },
                {
                    "id": "debcabal"
                },
                {
                    "id": "sol"
                },
                {
                    "id": "cencosud"
                },
                {
                    "id": "debvisa"
                },
                {
                    "id": "debmaster"
                },
                {
                    "id": "cmr"
                },
                {
                    "id": "debin_transfer"
                },
                {
                    "id": "sucredito"
                },
                {
                    "id": "visa"
                },
                {
                    "id": "amex"
                },
                {
                    "id": "diners"
                },
                {
                    "id": "maestro"
                },
                {
                    "id": "pagofacil"
                },
                {
                    "id": "rapipago"
                },
                {
                    "id": "cobroexpress"
                }
            */