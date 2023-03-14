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
            through: {model:'FriendUser', accept:'pending'} 
        });
        await friend.addFriendInList(user,{  
            through: {model:'FriendUser', accept:'false'}
        });
        console.log('llegue aqui')
        const FriendsAll = await FriendUser.findAll();
        return FriendsAll;
    } catch (error) {
        return {error:error.message};
    };
};
const acceptFriend = async (email,emailFriend) => {
    try {
        console.log(email,'---------------------',emailFriend)
        const userOne = await FriendUser.findOne({
            where:{
                UserEmail:email,
                FriendInListEmail:emailFriend
            }
        });
        const userTwo = await FriendUser.findOne({
            where:{
                UserEmail:emailFriend,
                FriendInListEmail:email
            }
        });
        console.log(userTwo, userOne)
        if(!userOne && !userTwo) throw new Error ('user not found');
        userOne.accept = 'true';
        userTwo.accept = 'true';
        await userOne.save();
        await userTwo.save();
        return 'Your friend was added';
    } catch (error) {
        return {error:error.message};
    }

};    
const removeOrRejectedFriend = async (email,emailFriend,response) => {
    try {
        if(response === 'remove'){
            const user = await User.findByPk(email);
            const friend = await User.findByPk(emailFriend);
            console.log('llegue aqui')
            await user.removeFriendInList(friend, {
                // especificar la tabla intermedia a utilizar
                through: FriendUser
            });
            await friend.removeFriendInList(user, {
                // especificar la tabla intermedia a utilizar
                through: FriendUser
            });
            return 'all ok'
        };
        if(response === 'rejected'){
            const user = await User.findByPk(email);
            const friend = await User.findByPk(emailFriend);
            console.log('llegue aqui')
            await user.removeFriendInList(friend, {
                // especificar la tabla intermedia a utilizar
                through: {model:FriendUser, where: {accept:'pending'}}
            });
            await friend.removeFriendInList(user, {
                // especificar la tabla intermedia a utilizar
                through: {model:FriendUser, where: {accept:'pending'}}
            });
            return 'all ok'
        };
    } catch (error) {
        return {error:error.message};
    };
};
const getAllFriends = async email => {
    try {

        const friendList = await FriendUser.findAll({
            where:{
                UserEmail:email,
                accept:'true',
            }
        });
        return friendList;
    } catch (error) {
        return {error:error.message};
    };
}; 
const getAllFriendsPending = async email => {
    try {

        const friendList = await FriendUser.findAll({
            where:{
                FriendInListEmail:email,
                accept:'pending',
            }
        });
        return friendList;
    } catch (error) {
        return {error:error.message};
    };
};

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

module.exports = {addFriends,getAllUsers,addUser,addProductInShoppingCartForUser,addWishToList,getAllFriends,getAllProductsInShoppingCart,getAllWishes,addNewComment,getAllCommentOfUser,getAllCommentOfProduct,deleteProductinShoppingCart,acceptFriend,removeOrRejectedFriend,getAllFriendsPending};
