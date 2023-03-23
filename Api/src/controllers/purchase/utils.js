const { User, Product} = require("../../db");
const arrayIncludesPurchase = [
    {
        model: User,
        attributes: ["email"],
    },
    {
        model: Product,
        attributes:["id","name","price","released","description","background_image"]
    },
];


module.exports = {arrayIncludesPurchase};

  // <CardLibrary
                            // key={Math.random()+product.ProductId}
                            // id={product.ProductId}
                            // name = {product.name} 
                            // price = {product.price}
                            // released = {product.released}
                            // background_image = { product.background_image}
                            // />