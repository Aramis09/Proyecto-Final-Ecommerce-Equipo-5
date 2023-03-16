require("dotenv").config();
const {ACCES_TOKEN} = process.env;
const axios = require('axios');
const mercadopago = require("mercadopago");

const createPaymentMercadoPago = async (items, client) => {
    let clientName; 
    let clientSurname;
    let clientFullName = selectNameSurname(client);
    clientName = clientFullName.clientName;
    clientSurname = clientFullName.clientSurname;
    //console.log('client name surname', clientName, clientSurname)
    //console.log(client.email)

    items = reshapeProductInItems(items, client.email);
    const preference = {
        items,
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
        back_urls: {
            success: "http://localhost:3000/",
            pending: "http://127.0.0.1:3000/",
            failure: "http://127.0.0.1:3000/",
        },
        auto_return: "approved", // si la compra es exitosa automaticamente redirige a "success" de back_urls
        binary_mode: true, //esto permite que el resultado de la compra sea solo 'failure' o solo 'success'
       // notification_url: "https://4271-2802-8010-4942-6c01-ccc8-3e4b-ee37-5312.sa.ngrok.io/payment/responseMP?source_news=webhooks",
        //esta variable de notificacion se tiene que cambiar depende si es para recibir por deploy o por la herramienta "ngrok",
        //la cual CADA vez que se levanta para recibir notificaciones con el repo, cambia de url, asi que OJO!
        ///payment/responseMP?source_news=webhooks
    }

    //console.log('si esto esta undefined, es porque no tenes el acces token en .env: ', ACCES_TOKEN)
    try {
        mercadopago.configure({
            access_token: ACCES_TOKEN
        });
        const response = await mercadopago.preferences.create(preference);
        //console.log('rrr', response)
        return response
    } catch (err) {
        console.log('error createPaymentMP', err)
    }
}



const notificationData = async (query)  => {

    const topic =  query.topic || query.type;
  var merchantOrder;
  switch(topic){
    case "payment":
      const paymentId = query.id || query['data.id'];
      const payment = await mercadopago.payment.findById(paymentId);
      merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id);
      break;
    case "merchant_order":
      const orderId = query.id;
      merchantOrder = await mercadopago.merchant_orders.findById(orderId)
      break;
  }
  //console.log('merch test', merchantOrder.body)
  
  //si existe la data de merchantOrder, usar la funcion de borrado de carrito: 
  if(merchantOrder.body.id){
    //axios.get(aca va la ruta de borrado de carrito nueva que creo aramis)
  }
  
  ////para visualizar el ejemplo:
  var transactionDataObject;
  var dbItem;
  merchantOrder.body.payments.forEach( async (item, index) => {
    dbItem = (await axios.get(`http://localhost:3001/products/${merchantOrder.body.items[index].id}`)).data
    //console.log(dbItem.price)
    transactionDataObject = {
        dateTransaction: item.date_approved, //modificar la fecha para que sea 'mm/dd/aa'
        priceUnit: dbItem.price, //esto debe venir de un llamado a la db
        specialDiscount: 0.1, //esto debe venir de un llamado a la db cuando este implementado
        priceUnitNet: item.total_paid_amount,
        serialOfGame: 'asnsdghnakjsdkjasdnkfdf', //lo inventamos con un hash?
        numberPaiment: item.id,
        gitftGame: false, //falta implementar,
        userEmailGift: '',
        ProductId: merchantOrder.body.items[index].id,
        userEmail: dbItem.description, //lamentablemente el mail lo pusimos en la descripcion de los items porque no teniamos otra manera de verlo
      //id: merchantOrder.body.id,
      //state: true //esto debe venir de la db
    };
    //console.log(transactionDataObject) //ESTO PASARLO POR AXIOS A DONDE CARLOS CREO LAS COSAS
    await axios.post(`http://localhost:3001/purchase/create`, {transactionDataObject})
  })

  

}



const selectNameSurname = (client) => {

    let clientName; 
    let clientSurname;
    let clientFullName = client.name.split(' ');
    //console.log('clientFullName', clientFullName)
    
    if(clientFullName.length === 1){
        clientName = clientFullName[0];
        clientSurname = 'No_tiene';
    }
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



const reshapeProductInItems = (items, email) => {

    let itemsReady = items.map(item => {
        return {
            id: item.id,
            title: item.name,
            picture_url: item.background_image,
            unit_price: parseFloat(item.price),
            description: email,
            category_id: "virtualKey", //needed
            quantity: 1, //needed
            currency_id: "ARS", //needed
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
    createPaymentMercadoPago,
    notificationData
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
