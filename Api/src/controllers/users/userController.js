const { User,ShoppingCart,Product } = require('../../db');


const addUser = async email => {
    try {
        const createUser = await User.create({
            email  
        });
        return createUser;
    } catch (error) {
       return {error:error.message}; 
    };
};
const addFriends = async (emailUser,emailFriend)=> {
    // const user = await User.findByPk(emailUser);
    // const friendForAdd = await User.findByPk(emailFriend);
    const user = (await User.findByPk('indra@gmail.com')).dataValues;
    const friendForAdd = (await User.findByPk('aramisjaime@48gmail.com')).dataValues;
    console.log(user,'----------------',friendForAdd);
    // await user.addUser(friendForAdd);
    // await user.addFriend(friendForAdd);
    await friendForAdd.addUser(user);
};


const getAllUsers = async () =>{
    try {
        const userList = await User.findAll({
            include: [{
              model: Product,
              through: { model: ShoppingCart }
            }]
          });
        return userList;
    } catch (error) {
        return {error:error.message};
    };
};

const addProductInShoppingCartForUser = async (pkUser,pkProduct) => {
    try {
        const user = await User.findByPk(pkUser);
        const  porductToAdd = await Product.findByPk(pkProduct);
        await user.addProduct(porductToAdd, {
            // especificar la tabla intermedia a utilizar
            joinTableName: ShoppingCart
        });
        const userWithProduct = await User.findByPk(pkUser);
        return userWithProduct;
    } catch (error) {
        return {error:error.message};
    }
};

module.exports = {addFriends,getAllUsers,addUser,addProductInShoppingCartForUser};


