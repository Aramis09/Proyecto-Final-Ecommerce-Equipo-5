const { searchFriendsByEmail,getAllWishes,getAllUsers,addUser,addProductInShoppingCartForUser,addFriends,addWishToList,getAllFriends,getAllProductsInShoppingCart,addNewComment,getAllCommentOfUser,getAllCommentOfProduct,deleteProductinShoppingCart,acceptFriend,removeOrRejectedFriend,getAllFriendsPending,addAllProductInShoppingCartForUser,removeWishToList } = require('../controllers/users/userController');

const addNewUser = async (req,res) => {
    try {
        const { email, name, image } = req.query;
        if(!email) throw new Error('please send me a user email.');
        const addedUser = await addUser(email, name, image);
        //console.log()(addedUser)
        //console.log()(email)
        return res.status(200).json(addedUser);
        // return res.status(200).json('addedUser');

    } catch (error) {
        return res.status(400).json(error.message);
    }; 
};



const addNewProductInShoppingCart = async (req,res) => {
    try {
        const {email,idProduct} = req.query;
        if(!email || !idProduct) throw new Error('send me all data please');
        const userWithProductAdded = await addProductInShoppingCartForUser(email,idProduct);
        if(userWithProductAdded.error) throw new Error(userWithProductAdded.error);
        return res.status(200).json(userWithProductAdded);
    } catch (error) {
        return res.status(400).json(error.message);
    };
};

const addAllProductInShoppingCart = async (req,res) => {
    try {
        const {arrayAllProductInShoppingCart} = req.body;
        if(arrayAllProductInShoppingCart.length===0) throw new Error('send me all data please (array empty)');
        const userWithAllProductAdded = await addAllProductInShoppingCartForUser(arrayAllProductInShoppingCart); //lo que tengo que mandar por body es { arrayAllProductInShoppingCart: [{UserEmail ,},{}]}
        if(userWithAllProductAdded.error) throw new Error(userWithAllProductAdded.error);
        return res.status(200).json(userWithAllProductAdded);
    } catch (error) {
        return res.status(400).json(error.message);
    };
};


const removeProductoInShoppingCar = async (req,res) => { 
    try {
        const {email,idProduct} = req.query;
        if(!email || !idProduct) throw new Error('send me all data please');
        const newList = await deleteProductinShoppingCart(email,idProduct);
        if(newList.error) throw new Error(newList.error);
        return res.status(200).json(newList);
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
    try {
        const {user, product} = req.query;
        if(!user || !product) throw new Error('send me all data please');
        const prueba = await addWishToList(user,product);
        return res.status(200).send(prueba);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};
const userID = async (req,res) => {
    
};

const removeWish = async (req,res) => {
    try {
        const {user, product} = req.query;
        if(!user || !product) throw new Error('send me all data please');
        const prueba = await removeWishToList(user,product);
        return res.status(200).send(prueba);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const addNewFriend = async (req,res) => {
   try {
    const {emailUser,emailFriend} = req.query;
    if(!emailUser || !emailFriend) throw new Error('send me all data please');
    const userAddedFriend = await addFriends(emailUser,emailFriend);
    // if(userAddedFriend.error) throw new Error(userAddedFriend.error);
    return res.status(200).json(userAddedFriend);
   } catch (error) {
    return res.status(400).json(error.message);
   };
};
const responseRequestNewFriend = async (req,res) => {
    try {
        const { email,emailFriend,response } = req.query;
        if(!email || !emailFriend || !response) throw new Error('send me all data please');
        //console.log()(email,emailFriend,response)
        if(response === 'accept'){
            const result = await acceptFriend(email,emailFriend);
            if(result.error) throw new Error(result.error);
            return res.status(200).json('the friend was accept');            
        };
        const result = await removeOrRejectedFriend(email,emailFriend,response);
        if(result.error) throw new Error(result.error);
        return res.status(200).json('the friend was rejected');            
     
          
        // return res.status(200).json('the friend was rejected');
    } catch (error) {
        return res.status(400).json(error.message);
    }
};
const friendsList = async (req,res) => {
    try {
        const { email } = req.query;
        if(!email) throw new Error('send me all data please');
        const friendsList = await getAllFriends(email);
        if(friendsList.error) throw new Error(friendsList.error);
        return res.status(200).json(friendsList);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};
const friendsPendingList = async (req,res) => {
    try {
        const { email } = req.query;
        if(!email) throw new Error('send me all data please');
        const friendsPendingList = await getAllFriendsPending(email);
        if(friendsPendingList.error) throw new Error(friendsPendingList.error);
        return res.status(200).json(friendsPendingList);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const searchFriends = async (req,res) => {
    try {    
        const {emailUser,valurForSearch} = req.query;
        if(!emailUser || !valurForSearch) throw new Error("please send me all data");
        const listFriendsFound = await searchFriendsByEmail(emailUser,valurForSearch);
        return res.status(200).json(listFriendsFound);
    } catch (error) {
        return res.status(400).json(error.message);        
    }
};
const productsListShoppingCart = async (req,res)=> {
    try {
        const { email } = req.query;
        if(!email) throw new Error('send me all data please');
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
        if(!email) throw new Error('send me all data please');
        const productList = await getAllWishes(email);
        if(productList.error) throw new Error(productList.error);
        return res.status(200).json(productList);
    } catch (error) {
        return res.status(400).json(error.message);
    };
};

const addComment = async (req,res) => {
    try {
        const { email,comment,productId, date, image, stars } = req.body;
        //console.log()('estoy en userhanlders/addCommet y recibo por body las STARS', stars)
        if(!email || !comment || !productId ) throw new Error('email or comment or productId is missing. Send data correctly please...');
        const newComment = await addNewComment(email,comment,productId, date ,image, stars);
        return res.status(200).json(newComment);
    } catch (error) {
        return res.status(400).json(error.message);
    };
};


const commentListOfUser = async (req,res) => {
    try {
        const { email } = req.query;
        if(!email) throw new Error('send me all data please');
        const commentList = await getAllCommentOfUser(email);
        return res.status(200).json(commentList);
    } catch (error) {
        return res.status(400).json(error.message);
    };
};


const commentListOfProduct= async (req,res) => {
    try {
        const { productId } = req.query;
        if(!productId) throw new Error('send me a productId');
        const commentList = await getAllCommentOfProduct(productId);
        return res.status(200).json(commentList);
    } catch (error) {
        return res.status(400).json(error.message);
    };
};

module.exports = { searchFriends,userList,userID,addNewUser,addNewProductInShoppingCart,addNewFriend,addWish,friendsList,productsListShoppingCart,wishesList,addComment,commentListOfUser,commentListOfProduct,removeProductoInShoppingCar,responseRequestNewFriend,friendsPendingList,addAllProductInShoppingCart,removeWish };