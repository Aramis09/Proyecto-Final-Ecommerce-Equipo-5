const {Router}=require("express");
const { genresList,genresID } = require("../../handlers/genresHanlders");
const genresRouter = Router();

genresRouter.get("/",genresList);
genresRouter.get("/:id",genresID);


module.exports = genresRouter;