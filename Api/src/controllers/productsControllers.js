const {Product, Plataform, Image, Genre, Store} = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

let arrayPlataforms =[];
let arrayImages =[];
let arrayGenres =[];
let arrayStores =[];

const getAllProducts= async ()=>{
    let products = null;
    products = await Product.findAll();
    console.log('products',products);
    if (products.length===0){
        await cargaBDProducts();
        products = await Product.findAll();
    }
    return products;
};

const getDataRestProducts = async ()=>{
    try {
        let data = (await axios.get(`https://apisgames-production.up.railway.app/products`)).data;
        let dataRequerida = await data.map((c) => {
            if (c.platforms.length > 0){
                c.platforms.forEach(element=>{
                    if (!arrayPlataforms.includes(element)){
                        arrayPlataforms.push({id:arrayPlataforms.length, name:element});

                    }
                })
            };
            let reg = {
                id: c.id,
                name: c.name,
                background_image: c.background_image,
                rating: parseFloat(c.rating),
                playtime: parseInt(c.playtime),
                price: parseFloat(c.price),
                description: c.description,
            };
            return reg;
        });
        return dataRequerida;
    } catch (error) {
        console.log(error.message);
    }
}

const cargaBDProducts = async () =>{
    try {
        const dataOK = await getDataRestProducts();
        await Promise.all(
            dataOK.map(async (element)=>{
                await Product.create(element);
            })
        )
    } catch (error) {
        console.log(error.message);
    }
}

const getProductById = async (id)=>{
    const user =  await Product.findByPk(id,{
            include:{
                model:Plataform,
                attributes:["title","body"],
            },
        });
    return user;
};


module.exports = {getAllProducts,getProductById};