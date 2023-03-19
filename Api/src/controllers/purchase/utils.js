const { User, Product} = require("../../db");
const arrayIncludesPurchase = [
    {
        model: User,
        attributes: ["email"],
    },
    {
        model: Product,
        attributes:["name","price","released","description","background_image"]
    },
];


module.exports = {arrayIncludesPurchase};