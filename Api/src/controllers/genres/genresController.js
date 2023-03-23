const {Genre} = require("../../db");

const getAllGenres = async ()=>{
    ////console.log()( 'entreeooo')
    try {
        let genresList = await Genre.findAll({
            attributes:['id','name'],
            where:{state:true},
        });
        ////console.log()(genresList,'<-------------')
        if (!genresList.length) throw Error("Error: No existen Registros en la Tabla Genres"); 
        return genresList;
    } catch (error) {
        return {error:error.message}
    }
};

const getGenreById = async id =>{
    if (!id) throw Error("Error: Debe existir un valor ID, ID=null..!");
    try {
        const genreFound = await Genre.findOne({
            attributes:['id','name'],
            where:{id:Number(id), state:true},
        });
        if (!genreFound) throw Error(`Error: ID=${id} no encontrado..!!`);
        return genreFound;
    } catch (error) {
        return {error:error.message};
    };
};

module.exports = { getAllGenres,getGenreById };