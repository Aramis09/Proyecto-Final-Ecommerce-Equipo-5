const {Product, Platform, Image, Genre, Store} = require("../../db");
const arrayIncludes = [
    {
        model: Image,
        attributes: ["image_path"],
    },
    {
        model: Platform,
        attributes: ["name"],
        through: { attributes: [] },
    },
    {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] },
    },
    {
        model: Store,
        attributes: ["name"],
        through: { attributes: [] },
    },
]
const options ={
    include:arrayIncludes
};

let arrayPlatforms =[];
let arrayGenres =[];
let arrayStores =[];

let arrayImagesDet =[];
let arrayPlatformsDet =[];
let arrayGenresDet =[];
let arrayStoresDet =[];

module.exports = {options,arrayStoresDet,arrayGenresDet,arrayPlatformsDet,arrayPlatforms,arrayGenres,arrayStores,arrayImagesDet
};
