const { User, Product} = require("../../db");
const arrayIncludesPurchase = [
    {
        model: User,
        attributes: ["email"],
    },
    {
        model: Product,
        attributes:["name","description","background_image"]
    },
];


module.exports = {arrayIncludesPurchase};