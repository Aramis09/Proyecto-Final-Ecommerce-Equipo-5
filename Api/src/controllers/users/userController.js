const { User,ShoppingCart,Product,Friend,WishlistProduct,FriendUser,Comment } = require('../../db');


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
    try {
    
        const user = await User.findByPk(emailUser);
        const friend = await User.findByPk(emailFriend);
        await user.addFriendInList(friend,{  
            through: 'FriendUser'
        });
        await friend.addFriendInList(user,{  
            through: 'FriendUser'
        });
        console.log('llegue aqui')

        const FriendsAll = await FriendUser.findAll();
        console.log(FriendsAll)
        return FriendsAll;
    } catch (error) {
        return {error:error.message};
    };
};

// await user.addWishlist(productToAdd, {
//     through: 'WishlistProduct' // especificar la tabla intermedia a utilizar
// });

const getAllUsers = async () =>{
    try {
        const userList = await User.findAll({
            include: [{
              model: Product,
              through: { model: ShoppingCart },
            },
            ]
          });
        return userList;
    } catch (error) {
        return {error:error.message};
    };
};
const getAllFriends = async email => {
    try {
        const user = await User.findByPk(email);
        const friendList = await user.getFriendInList();
        return friendList;
    } catch (error) {
        return {error:error.message};
    }
};
const addProductInShoppingCartForUser = async (pkUser,pkProduct) => {
    try {
        const user = await User.findByPk(pkUser);
        const  porductToAdd = await Product.findByPk(pkProduct);
        await user.addProduct(porductToAdd, {
            // especificar la tabla intermedia a utilizar
            through: { ShoppingCart: pkProduct } 
        });
        const newList = await getAllProductsInShoppingCart(pkUser);
        return newList;
    } catch (error) {
        return {error:error.message};
    };
};
const getAllProductsInShoppingCart = async email=> {
    try {
        const user = await User.findByPk(email);
        const productList = await user.getProducts(); //trae los productos del carrito, como no modifique el famoso "as" de estebab queda en Products :addProduct,getProducts, etc...
        return productList;
    } catch (error) {
        return {error:error.message};
    };
};
const deleteProductinShoppingCart = async (email,idProduct) => {
    try {
        const user = await User.findByPk(email);
        const  porductToAdd = await Product.findByPk(idProduct);
        await user.removeProduct(porductToAdd, {
            // especificar la tabla intermedia a utilizar
            through: { ShoppingCart: idProduct } 
        });
        const newList = await getAllProductsInShoppingCart(email);
        return newList;
    } catch (error) {
        return {error:error.message};
    };
};
const addWishToList = async (pkUser,pkProduct) => {
    try {
        const user = await User.findByPk(pkUser);
        const productToAdd = await Product.findByPk(pkProduct);
        await user.addWishlist(productToAdd, {
            through: 'WishlistProduct' // especificar la tabla intermedia a utilizar
        });
        return 'product add in wishList';
    } catch (error) {
        return {error:error.message};
    };
};
const getAllWishes = async email => {
    try {
        const user = await User.findByPk(email);
        const friendList = await user.getWishlist();
        return friendList;
    } catch (error) {
        return {error:error.message};
    }
};

const addNewComment = async (email,comment,product ) => {
    // const now = sequelize.literal('CURRENT_TIMESTAMP');
    const now = new Date();
    console.log(email,product,comment);
    const newComment = await Comment.build({ //tengo que mejorar esto porque no anda
        Comment: comment,
        Hour:now,
        Date:now,
        userId: email,
        productId: product,
    });
    await newComment.save();
    return newComment;
};

const getAllCommentOfUser = async email => {
    const commentOfUser = await Comment.findAll({
        where: {userId:email}
    });
    return commentOfUser;
};

const getAllCommentOfProduct = async idProduct => {
    const commentOfUser = await Comment.findAll({
        where: {productId:idProduct}
    });
    return commentOfUser;
};

module.exports = {addFriends,getAllUsers,addUser,addProductInShoppingCartForUser,addWishToList,getAllFriends,getAllProductsInShoppingCart,getAllWishes,addNewComment,getAllCommentOfUser,getAllCommentOfProduct,deleteProductinShoppingCart};


