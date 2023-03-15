const { changePropertyProducts,blockedUser,makeAdmin,verifyIsAdmin,createFirstAdmin } = require("../controllers/admin/adminController");

const editProduct = async (req,res) => {
    try {
        const { emailAdmin,secret } = req.query; // es para verificar si es administrador.
        const adminFound = await verifyIsAdmin(emailAdmin,secret);
        if(!adminFound) throw new Error('you are not admin, if you try again will blocked');
        const { id,name,background_image,rating,playtime,price,description,released,state,created,genres,images } = req.body;
        let propertys = { id,name,images,genres,background_image,rating,playtime,price,description,released,state,created }; 
        const productModify = await changePropertyProducts(propertys);
        return res.status(200).json(productModify);
    } catch (error) {
        return res.status(400).json({error:error.message});
    };
    
};

const blockUser = async (req,res) => {
    try {
        const { emailAdmin,secret,emailUser } = req.query; // falta verificar si el usuario es administrador
        const adminFound = await verifyIsAdmin(emailAdmin,secret);
        if(!adminFound) throw new Error('you are not admin, if you try again will blocked');
        const userBlockedList = await blockedUser(emailUser);
        return res.status(200).json(userBlockedList);
    } catch (error) {
        return res.status(400).json({error:error.message});
    };
};

const makeUserAdmin = async (req,res) => {
    try {
        const { emailAdmin,emailUser,secret,newSecret } = req.query; // falta verificar si el usuario es administrador
        if(!emailAdmin || !emailUser || !secret || !newSecret)  throw new Error ('you are not admin, if you try again will blocked')
        const firstAdmin = await createFirstAdmin(emailAdmin,secret);
        if(firstAdmin) return res.status(200).json(firstAdmin);
        let adminFound = await verifyIsAdmin(emailAdmin,secret);
        if(!adminFound) throw new Error ('you are not admin, if you try again will blocked')
        const userAdminList = await makeAdmin(emailUser,newSecret);
        return res.status(200).json(userAdminList);
    } catch (error) {
        return res.status(400).json({error:error.message});
    };
};





module.exports = {
    editProduct,
    blockUser,
    makeUserAdmin
};