const { getAllWishes,getAllUsers,addUser,addProductInShoppingCartForUser,addFriends,addWishToList,getAllFriends,getAllProductsInShoppingCart,addNewComment,getAllCommentOfUser,getAllCommentOfProduct } = require('../controllers/users/userController');

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
    // if(userAddedFriend.error) throw new Error(userAddedFriend.error);
    return res.status(200).json(userAddedFriend);
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

const friendsList = async (req,res) => {
    try {
        const { email } = req.query;
        const friendsList = await getAllFriends(email);
        if(friendsList.error) throw new Error(friendsList.error);
        return res.status(200).json(friendsList);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const productsListShoppingCart = async (req,res)=> {
    try {
        const { email } = req.query;
        const productList = await getAllProductsInShoppingCart(email);
        if(productList.error) throw new Error(productList.error);
        return res.status(200).json(productList);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const wishesList = async (req,res) => {
    try {
        const { email } = req.query;
        const productList = await getAllWishes(email);
        if(productList.error) throw new Error(productList.error);
        return res.status(200).json(productList);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const addComment = async (req,res) => {
    try {
        const { email,comment,product } = req.query;
        const newComment = await addNewComment(email,comment,product );
        return res.status(200).json(newComment);
    } catch (error) {
        return res.status(400).json(error.message);
    };
};


const commentListOfUser = async (req,res) => {
    try {
        const { email } = req.query;
        const commentList = await getAllCommentOfUser(email);
        return res.status(200).json(commentList);
    } catch (error) {
        return res.status(400).json(error.message);
    };
};


const commentListOfProduct= async (req,res) => {
    try {
        const { idProduct } = req.query;
        const commentList = await getAllCommentOfProduct(idProduct);
        return res.status(200).json(commentList);
    } catch (error) {
        return res.status(400).json(error.message);
    };
};

module.exports = { userList,userID,addNewUser,addNewProductInShoppingCart,addNewFriend,addWish,friendsList,productsListShoppingCart,wishesList,addComment,commentListOfUser,commentListOfProduct };