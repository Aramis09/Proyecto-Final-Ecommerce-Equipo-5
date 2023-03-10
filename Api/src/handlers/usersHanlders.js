const { getAllUsers,addUser,addProductInShoppingCartForUser,addFriends,addWishToList } = require('../controllers/users/userController');

const addNewUser = async (req,res) => {
    try {
        const { email } = req.query;
        if(!email) throw new Error('please send me a user email.');
        const addedUser = await addUser(email);
        console.log(addedUser)
        console.log(email)
        return res.status(200).json(addedUser);
        // return res.status(200).json('addedUser');

    } catch (error) {
        return res.status(400).json(error.message);
    }; 
};

const addNewFriend = async (req,res) => {
   try {
    const {emailUser,emailFriend} = req.query;
    const userAddedFriend = await addFriends(emailUser,emailFriend);
    if(userAddedFriend.error) throw new Error(userAddedFriend.error);
    return res.status(200).json('Friend was added');
   } catch (error) {
    return res.status(400).json(error.message);
   };
};


const addNewProductInShoppingCart = async (req,res) => {
    try {
        const {email,idProduct} = req.query;
        const userWithProductAdded = await addProductInShoppingCartForUser(email,idProduct);
        if(userWithProductAdded.error) throw new Error(userWithProductAdded.error);
        return res.status(200).json(userWithProductAdded);
    } catch (error) {
        return res.status(400).json(error.message);
    };
};

const userList = async (req,res) => {
    try {
        const userList = await getAllUsers();
        if(userList.error) throw new Error(userList.error);
        return res.status(200).json(userList);
    } catch (error) {
        return res.status(400).json(error.message);
    };
};

const addWish = async (req,res) => {
    const {user, product} = req.query;
    const prueba = await addWishToList(user,product);
    return res.status(200).send(prueba);
};
const userID = async (req,res) => {

};

module.exports = { userList,userID,addNewUser,addNewProductInShoppingCart,addNewFriend,addWish };