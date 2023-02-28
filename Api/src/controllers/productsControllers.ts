import axios from 'axios';
import { Op } from 'sequelize';

const cleanArray=(arr: any[])=>{
    const clean = arr.map((elem)=>{
        return {
            id: elem.id,
            name:elem.name,
            released:elem.released,
            background_image:elem.background_image,
            rating:elem.rating,
            playtime:elem.playtime,
            price:elem.price,
            created: false,
        };
    });
    return clean;
};


export const getAllProducts = async ()=>{
    const apiUsersRaw = (await axios.get(`https://apisgames-production.up.railway.app/products`)).data;
    const apiUsers =cleanArray(apiUsersRaw);
    console.log("apiUsersRaw",apiUsersRaw);
    console.log("apiUsers",apiUsers);

    return apiUsers;
};