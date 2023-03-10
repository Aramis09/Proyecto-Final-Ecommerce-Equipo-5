const { User,ShoppingCart,Product,Friend,WishlistProduct,FriendUser } = require('../../db');


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
        console.log(emailUser,emailFriend)
        const user = await User.findByPk(emailUser);
        const friend = await Friend.create({emailFriend});
        await friend.setUser(user);
    } catch (error) {
        return {error:error.message}
    }

};
// const addFriends = async (emailUser,emailFriend)=> {
//     try {
//         console.log(emailUser,emailFriend)
//         const user = await User.findByPk(emailUser);
//         const friend = await Friend.create({emailFriend});
//         await user.addFriendToList(friend,{
//             through: 'FriendUser'
//         });
//     } catch (error) {
//         return {error:error.message};
//     };
// };

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
        const userWithProduct = await User.findByPk(pkUser);
        return userWithProduct;
    } catch (error) {
        return {error:error.message};
    }
};

const addWishToList = async (pkUser,pkProduct) => {
    try {
        const user = await User.findByPk(pkUser);
        const productToAdd = await Product.findByPk(pkProduct);
        await user.addWishlist(productToAdd, {
            through: 'WishlistProduct' // especificar la tabla intermedia a utilizar
        });
        // const wishlist = await user.getProducts({
        //     through: { model: WishlistProduct, as: 'Wishlist' } // especificar la tabla intermedia a utilizar
        // });
        // return wishlist;
    } catch (error) {
        return {error:error.message};
    };
};


module.exports = {addFriends,getAllUsers,addUser,addProductInShoppingCartForUser,addWishToList};


