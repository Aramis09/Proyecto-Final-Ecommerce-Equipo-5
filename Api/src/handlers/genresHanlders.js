const { getAllGenres,getGenreById } = require("../controllers/genres/genresController.js");

const genresList = ('/',async (req,res)=>{
    try {
        const genresList = await getAllGenres();
        ////console.log()(genresList)
        if(genresList?.error){
            return res.status(404).json(genresList.error);
        };
        return res.status(200).json(genresList);
    } catch (error) {
        return res.status(404).json(error.message);
    }
});


const genresID = async (req,res) => {
    const { id } = req.params;
    try {
        const genresFound = await getGenreById(parseInt(id));
        if(genresFound?.error){
            return res.status(404).json(genresFound.error);
        };
        res.status(201).json(genresFound);
    } catch (error) {
        return res.status(404).json(error.message);
    };
};

module.exports = { genresList,genresID };