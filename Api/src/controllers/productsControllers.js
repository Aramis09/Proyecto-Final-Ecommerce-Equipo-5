const {Product, Plataform} = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id: elem.id,
            name:elem.name,
            email:elem.email,
            phone:elem.phone,
            created: false
        };
    });
    return clean;
};

const getAllProducts= async ()=>{
    const databaseUsers = await User.findAll();
    const apiUsersRaw = (await axios.get(`https://jsonplaceholder.typicode.com/users`)).data;
    const apiUsers =cleanArray(apiUsersRaw);
    return [...databaseUsers, ...apiUsers];
};

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