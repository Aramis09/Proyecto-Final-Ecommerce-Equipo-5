const {Platform} = require("../../db");
const { Op } = require("sequelize");

const getAllPlatforms = async ()=>{
    try {
        let platformsList = await Platform.findAll({
            attributes:['id','name'],
            where:{state:true},
        });
        if (platformsList.length===0) throw Error("Error: No existen Registros en la Tabla Platform"); 
        return platformsList;
    } catch (error) {
        throw Error(error.message)
    }
};

const getPlatformById = async id =>{
    if (!id) throw Error("Error: Debe existir un valor ID, ID=null..!");
    try {
        const platform = await Platform.findOne({
            attributes:['id','name'],
            where:{id:Number(id), state:true},
        });
        if (!platform) throw Error(`Error: ID=${id} no encontrado..!!`);
        return platform;
    } catch (error) {
        throw Error(error.message)
    };
};

const getPlatformsByName = async (name) => {
    try {
        let platforms = await Platform.findAll({
            attributes:['id','name'],
            where:{
                name:{
                    [Op.iLike]:`%${name}%`, 
                },
                state:true,
            },
        });
        if (platforms.length===0) throw Error(`Error: NAME=${name} no se encontro ningun registro en Plataforms..!!`);
        return platforms;
    } catch (error) {
        throw Error(error.message)
    }
    
};

module.exports = {getAllPlatforms, getPlatformById, getPlatformsByName};