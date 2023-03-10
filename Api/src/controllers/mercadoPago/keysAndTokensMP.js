//buscar la api y los tokens que cuentan en la pagina


const mercadoPagoUrl = "https://api.mercadopago.com/checkout";
const access_token = 'TEST-7852724530725730-030822-11e5a4398074067b6c6bc5f2afe9b7f1-1326341565';
const public = "TEST-5bbaf9c6-7285-45e4-966a-83819d381b76";
//'TEST-5305777136426691-030812-958c46435742204b563507f2af6fad28-1109141153'; //este es el token oficial de mercadopago pero para testeos
//ellos tiene otro token que no es de testeos, cualquier cosa preguntar a Nicrus27(Nahuel).

module.exports = {
    mercadoPagoUrl,
    access_token
}