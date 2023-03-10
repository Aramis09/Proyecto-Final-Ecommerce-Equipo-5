const { createPaymentMercadoPago } = require("../controllers/mercadoPago/mercadoPagoControllers");

const getMercadoPagoLink = async (req, res) => {
    console.log('inicio getMPL')

    /*
    let items = [ //este es un array de prueba
      {
        id: 3939, //needed
        title: "PAYDAY 2", //needed
        picture_url: "https://media.rawg.io/media/games/73e/73eecb8909e0c39fb246f457b5d6cbbe.jpg", //needed
        //"rating": "3.51",
        //"playtime": 9,
        unit_price: 9.99, //needed
        //needed (abajo)
        description: "PAYDAY 2 is an action-packed, four-player co-op shooter that once again lets gamers don the masks of the original PAYDAY crew - Dallas, Hoxton, Wolf and Chains - as they descend on Washington DC for an epic crime spree.",
        category_id: "virtualKey", //needed
        quantity: 1, //needed
        currency_id: "USD", //needed
      }
    ];
    */

    let items = [ //este es un array de prueba
      {
        id: 3939, //needed
        name: "PAYDAY 2", //needed
        background_image: "https://media.rawg.io/media/games/73e/73eecb8909e0c39fb246f457b5d6cbbe.jpg", //needed
        "rating": "3.51",
        "playtime": 9,
        "price": "9.99", //needed
         //needed (abajo)
        description: "PAYDAY 2 is an action-packed, four-player co-op shooter that once again lets gamers don the masks of the original PAYDAY crew - Dallas, Hoxton, Wolf and Chains - as they descend on Washington DC for an epic crime spree.",
        "released": "2013-08-13",
        "images": [
            "https://media.rawg.io/media/screenshots/4ee/4ee5c3c8b850ab4ba8e04b9f5d5ab060.jpg",
            "https://media.rawg.io/media/screenshots/a5d/a5da0d01195f01cdedec974d52892128.jpg",
            "https://media.rawg.io/media/screenshots/c2c/c2ccfeaeda357f932d1899a91f298850.jpg",
            "https://media.rawg.io/media/screenshots/a18/a18da938def6ce6e5b571f1c20272ab0.jpg",
            "https://media.rawg.io/media/screenshots/c38/c38f5aa479eebab20cedcdae370e6e18.jpg",
            "https://media.rawg.io/media/screenshots/442/442be5656b314e3289ecd1486b5282f1.jpg",
            "https://media.rawg.io/media/games/73e/73eecb8909e0c39fb246f457b5d6cbbe.jpg"
        ],
        "platforms": [
            "Linux",
            "PC",
            "Xbox One"
        ],
        "genres": [
            "Action",
            "Shooter"
        ],
        "stores": [
            "Steam",
            "Xbox 360 Store",
            "Nintendo Store",
            "PlayStation Store"
        ]
      }
    ];

    let client = {
      name: "nombre nombre apellido",
      email: "cualquiercosa@gmail.com"
    }
    //console.log('items handler: ', items)
    //mandar al array a la funcion createPaymentMercadoPago.
    let paymentCreated = await createPaymentMercadoPago(items, client)
    //console.log('response payment created: ', paymentCreated) //paymentCreated.init_point?
    console.log('response payment created: ', paymentCreated);
    res.status(200).send(paymentCreated)
} 

const webhook = (req, res) => {
    console.log('webhook req.method: ', req.method) //probar este handler para entender su funcionamiento
    if (req.method === "POST") { 
        let body = ""; 
        req.on("data", chunk => {  
          body += chunk.toString();
          console.log('body data webhook', body)
        });
        req.on("end", () => {  
          console.log(body, "webhook response"); 
          res.end("ok");
        });
      }
      return res.status(200); 
}

module.exports = {
    getMercadoPagoLink,
    webhook
}