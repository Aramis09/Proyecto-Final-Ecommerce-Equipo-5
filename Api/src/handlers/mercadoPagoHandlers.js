const { createPaymentMercadoPago, notificationData } = require("../controllers/mercadoPago/mercadoPagoControllers");

const getMercadoPagoLink = async (req, res) => {

  let {items, client, discount} = req.body;
  /*
  client = {
      name: "nombre nombre apellido",
      email: "cualquiercosa@gmail.com"
    }
  */
  ////console.log()('client', items[0].Genres, discount)
  let paymentCreated = await createPaymentMercadoPago(items, client, discount)
  res.status(200).send(paymentCreated)
}

const responseMP = async (req, res) => {
  const {query} = req;
  notificationData(query)
  res.status(200).send()
}

module.exports = {
    getMercadoPagoLink,
    responseMP
}

/*

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

*/