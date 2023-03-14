const { changePropertyProducts } = require("../controllers/admin/adminController");

const editProduct = async (req,res) => {
    try {
        // const { email } = req.query;  falta verificar si el usuario es administrador
        const { id,name,background_image,rating,playtime,price,description,released,state,created,genres,images } = req.body;
        let propertys = { id,name,genres,background_image,rating,playtime,price,description,released,state,created }; 
        const productModify = await changePropertyProducts(propertys);
        return res.status(200).json(productModify);
    } catch (error) {
        return res.status(400).json({error:error.message});
    };
    
};


module.exports = {editProduct};