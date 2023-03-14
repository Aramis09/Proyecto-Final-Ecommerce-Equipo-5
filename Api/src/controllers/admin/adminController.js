const { Product,Genre } = require("../../db");


const changePropertyProducts = async (propertys) => {
    const { id,name,background_image,rating,playtime,price,description,released,state,created,genres,images } = propertys;
    const productByModify = await  Product.findByPk(id);   
    if(name){
        productByModify.name = name;
        await productByModify.save();
    };
    if(background_image){
        productByModify.background_image = background_image;
        await productByModify.save();
    };
    if(rating){
        productByModify.rating = rating;
        await productByModify.save();
    };
    if(playtime){
        productByModify.playtime = playtime;
        await productByModify.save();
    };
    if(price){
        productByModify.price = price;
        await productByModify.save();
    };
    if(description){
        productByModify.description = description;
        await productByModify.save();
    };
    if(released){
        productByModify.released = released;
        await productByModify.save();
    };
    if(state){
        productByModify.state = state;
        await productByModify.save();
    };
    if(created){
        productByModify.created = created;
        await productByModify.save();
    };
    await associationGenresWithProduct(productByModify,genres);
    return productByModify;
};

const associationGenresWithProduct = async (productByModify,genres) => {
    await productByModify.setGenres([]);
    const genresArrayModify = genres.map(nameGenre => ({name:nameGenre}));
    await Promise.all(genresArrayModify.map(async genre => {
    return Genre.findOrCreate({ where: { name: genre.name } })
    .then(([genre])=> productByModify.addGenre(genre));
   }));
};
module.exports = {
    changePropertyProducts
};

// https://pbs.twimg.com/profile_images/1069252636950609925/XR1jBAn6_400x400.jpg