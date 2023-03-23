require("dotenv").config();
const {ACCES_TOKEN, PF_MAIL, PASS_PF_MAIL} = process.env;
const axios = require('axios');
const nodemailer = require('nodemailer');
const mercadopago = require("mercadopago");
const {Product} = require('../../db');
const fs = require('fs');
//const htmlmail = fs.readFileSync()

const createPaymentMercadoPago = async (items, client, discount) => {
    //console.log(htmlmail, typeof htmlmail)
    let clientName; 
    let clientSurname;
    let clientFullName = selectNameSurname(client);
    clientName = clientFullName.clientName;
    clientSurname = clientFullName.clientSurname;
    if(discount.genre !== 'No_Discount'){
        items = applyDiscount(items, discount)
    }
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
            pending: "http://127.0.0.1:3000/failure",
            failure: "http://127.0.0.1:3000/failure",
        },
        auto_return: "approved", // si la compra es exitosa automaticamente redirige a "success" de back_urls
        binary_mode: true, //esto permite que el resultado de la compra sea solo 'failure' o solo 'success'
        notification_url: "https://e370-170-254-63-107.sa.ngrok.io/payment/responseMP?source_news=webhooks",
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

const mailProductsToBuyer = (email, products) => {
    products = products.map(item => {
        return `filename: ${item.title}, virtualKey: ${item.id}`
    })
    products = products.join('_');
    let transporter = nodemailer.createTransport({
        //service: "gmail",//"smtp.ethereal.email",
        host: 'smtp.gmail.com',
        port: 587,
        //secure: false, // true for 465, false for other ports
        auth: {
            user: PF_MAIL, // generated ethereal user 'marcel29@ethereal.email'
            pass: PASS_PF_MAIL, // generated ethereal password P2Ggd4FU2k78fpAafR
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const msg = {
        from: `Henry E-commerce Videogames GROUP-V`, // sender address '"Fred Foo" <foo@example.com>'
        to: `${email}`, // list of receivers
        subject: "Virtual Keys", // Subject line
        text: `
        This is a mail with the key/s of the product/s you just bought: \n
        ${products}
        `, // plain text body
        html:``
        }    
    // send mail with defined transport object
    transporter.sendMail(msg)
        .then(() => console.log('todo ok'))
        .catch((err) => console.log('nomelacontainer: ', err))
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

    console.log("------->",merchantOrder.body);
    var transactionDataObject;
    var dbItem;
    var paymentDate = new Date().toLocaleString("es-AR", {timeZone: "America/Argentina/Buenos_Aires"});
    if(merchantOrder.body.order_status === 'paid'){ //if(merchantOrder.body.order_status === 'paid'){
        var userMailFromDescription = merchantOrder.body.items[0].description;
        merchantOrder.body.items.forEach( async (productData, index) => {
            //console.log("------->",productData.unit_price, typeof productData.unit_price);
            dbItem = await Product.findByPk(merchantOrder.body.items[index].id);
            var calculatedDiscount = 100 - ((merchantOrder.body.items[index].unit_price * 100) / parseFloat(dbItem.price));
            calculatedDiscount = calculatedDiscount.toFixed(2);
            transactionDataObject = {
                dateTransaction: paymentDate,
                priceUnit: parseFloat(dbItem.price), //esto debe venir de un llamado a la db
                specialDiscount: parseFloat(calculatedDiscount),//calculatedDiscount,
                priceUnitNet: productData.unit_price,
                serialOfGame: 'asnsdghnakjsdkjasdnkfdf', //lo inventamos con un hash?
                numberPayment: merchantOrder.body.payments[0].id,
                giftGame: false, // que se va a hacer con esto???
                userEmailGift: '',
                ProductId: productData.id,
                UserEmail: userMailFromDescription,
            };
            await axios.post(`http://localhost:3001/purchase/create`, {transactionDataObject})
        })
        await axios.get(`http://localhost:3001/user/removeProductInShoppingCart?email=${userMailFromDescription}&idProduct=${'all'}`)
        mailProductsToBuyer(userMailFromDescription, merchantOrder.body.items);
        
    } else {
        console.log('estado de la orden: ', merchantOrder.body.order_status);
        console.log("------->",merchantOrder.body);
    }
}
    


const selectNameSurname = (client) => {

    let clientName; 
    let clientSurname;
    let clientFullName = client.name.split(' ');
    
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
    })
    return itemsReady

}


const applyDiscount = (items, discount) => {
    let itemsChecked = items.map(product => {
        var productGenres = product.Genres.map(item => item.name)
        if(productGenres.includes(discount.genre)){
            var disc_price = (((100 - discount.discount) * parseFloat(product.price)) / 100);
            disc_price = disc_price.toFixed(2);
            product = {
                id: product.id,
                name: product.name,
                background_image: product.background_image,
                price: disc_price
            }
        }
        return product
    })
    return itemsChecked
}



module.exports = {
    createPaymentMercadoPago,
    notificationData
}
