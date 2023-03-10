// const mercadopago = require("mercadopago");

// mercadopago.configure({access_token:process.env.MERCADOPAGO_KEY});
const paymentHandler = async (req,res)=>{ //hay que generar una referencia
//     try {
//         const productPay =  req.body ;

//         let preference = {
//             items: [{
//                 tittle:productPay.tittle,
//                 currency_id:productPay.currency_id,
//                 picture_url:productPay.image,
//                 description:productPay.description,
//                 category_id:'art',
//                 quantity: 1, //esto en el caso de que se compre uno solo, pero el dato viene po body si son mas.
//                 unit_price:900
//             }],
//             payer:{
//                 name: 'Aramis',
//                 surname:'Jaime',
//                 email:'aramisjaime48@gmail.com'
//             },
//             back_urls:{
//                 success: 'https://proyectodogs.netlify.app/',
//                 failure:'https://proyectodogs.netlify.app/',
//                 pending:'' // es cuando se paga algo en efectivo
//             },
//             auto_return: 'approved',
//             binary_mode:true // para que no se puedan hacer pagos en efectivo.
//         };
//         console.log(productPay);
//         console.log('llegue hasta aqui');
//         const response = await mercadopago.preferences.create(preference);
//         // console.log('response------------->',response)
//         console.log('llegue');
//         return res.status(200).send({global: response.body.id, res:response});
//     } catch (error) {
//         return {error:error.message};
//     };
};


module.exports = paymentHandler;