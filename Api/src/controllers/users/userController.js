const { Op } = require("sequelize");
const {
  User,
  ShoppingCart,
  Product,
  Friend,
  WishlistProduct,
  FriendUser,
  Comment,
  Genre
} = require("../../db");

const addUser = async (email, name, image) => {
  try {
    const createUser = await User.create({
      name,
      image,
      email,
      admin: false,
      blocked: false,
      secret: "",
    });
    return createUser;
  } catch (error) {
    return { error: error.message };
  }
};

const addFriends = async (emailUser, emailFriend) => {
  try {
    const user = await User.findByPk(emailUser);
    const friend = await User.findByPk(emailFriend);
    await user.addFriendInList(friend, {
      through: { model: "FriendUser", accept: "pending" },
    });
    await friend.addFriendInList(user, {
      through: { model: "FriendUser", accept: "false" },
    });
    const FriendsAll = await FriendUser.findAll();
    return FriendsAll;
  } catch (error) {
    return { error: error.message };
  };
};
const searchFriendsByEmail = async (emailUser,valueForSearch) => {
  try {
    const friendList = await FriendUser.findAll({
      where: {
        UserEmail: emailUser,
        accept: "true",
        FriendInListEmail:{
          [Op.iLike]:`%${valueForSearch}%`,
      },
      },
    });
    return friendList;
  } catch (error) {
    return { error: error.message };
  }
};
const addProductInShoppingCartForUser = async (pkUser, pkProduct) => {
  try {
    //console.log()("pkUser",pkUser,"pkProduct",pkProduct);

    const user = await User.findByPk(pkUser);
    const porductToAdd = await Product.findByPk(pkProduct);
    await user.addProduct(porductToAdd, {
      // especificar la tabla intermedia a utilizar
      through: { ShoppingCart: pkProduct },
    });
    const newList = await getAllProductsInShoppingCart(pkUser);
    return newList;
  } catch (error) {
    return { error: error.message };
  };
};



const addAllProductInShoppingCartForUser = async (arrayProuductsShoppingcart) => {
  try {
    //console.log()("arrayProuductsShoppingcart",arrayProuductsShoppingcart, Array.isArray(arrayProuductsShoppingcart));
    let pkUser = "";
    await Promise.all(
      arrayProuductsShoppingcart.map(async (element)=>{
        pkUser = element.UserEmail;
        await addProductInShoppingCartForUser(element.UserEmail,element.ProductId);
        })
      );
    const newList = await getAllProductsInShoppingCart(pkUser);
    return newList;
  }
  catch(error){
    return { error: error.message };
  };
};
const acceptFriend = async (email, emailFriend) => {
  try {
    const userOne = await FriendUser.findOne({
      where: {
        UserEmail: email,
        FriendInListEmail: emailFriend,
      },
    });
    const userTwo = await FriendUser.findOne({
      where: {
        UserEmail: emailFriend,
        FriendInListEmail: email,
      },
    });
    //console.log()(userTwo, userOne);
    if (!userOne && !userTwo) throw new Error("user not found");
    userOne.accept = "true";
    userTwo.accept = "true";
    await userOne.save();
    await userTwo.save();
    return "Your friend was added";
  } catch (error) {
    return { error: error.message };
  }
};

const removeOrRejectedFriend = async (email, emailFriend, response) => {
  try {
    if (response === "remove") {
      const user = await User.findByPk(email);
      const friend = await User.findByPk(emailFriend);
      //console.log()("llegue aqui");
      await user.removeFriendInList(friend, {
        // especificar la tabla intermedia a utilizar
        through: FriendUser,
      });
      await friend.removeFriendInList(user, {
        // especificar la tabla intermedia a utilizar
        through: FriendUser,
      });
      return "all ok";
    }
    if (response === "rejected") {
      const user = await User.findByPk(email);
      const friend = await User.findByPk(emailFriend);
      //console.log()("llegue aqui");
      await user.removeFriendInList(friend, {
        // especificar la tabla intermedia a utilizar
        through: { model: FriendUser, where: { accept: "pending" } },
      });
      await friend.removeFriendInList(user, {
        // especificar la tabla intermedia a utilizar
        through: { model: FriendUser, where: { accept: "pending" } },
      });
      return "all ok";
    }
  } catch (error) {
    return { error: error.message };
  }
};

const getAllFriends = async (email) => {
  try {
    const friendList = await FriendUser.findAll({
      where: {
        UserEmail: email,
        accept: "true",
      },
    });
    return friendList;
  } catch (error) {
    return { error: error.message };
  }
};
const getAllFriendsPending = async (email) => {
  try {
    const friendList = await FriendUser.findAll({
      where: {
        FriendInListEmail: email,
        accept: "pending",
      },
    });
    return friendList;
  } catch (error) {
    return { error: error.message };
  }
};

const getAllUsers = async () => {
  try {
    const userList = await User.findAll({
      include: [
        {
          model: Product,
          through: { model: ShoppingCart },
        },
      ],
    });
    return userList;
  } catch (error) {
    return { error: error.message };
  }
};


const getAllProductsInShoppingCart = async (email) => {
  try {
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Product,
          include: Genre
        }
      ]
    });

    const productList = user.Products;

    return productList;
  } catch (error) {
    return { error: error.message };
  }
};


const deleteProductinShoppingCart = async (email, idProduct) => {
  try {
    const user = await User.findByPk(email);
    if (idProduct !== "all") {
      const porductToAdd = await Product.findByPk(idProduct);
      await user.removeProduct(porductToAdd, {
        // especificar la tabla intermedia a utilizar
        through: { ShoppingCart: idProduct },
      });
      const newList = await getAllProductsInShoppingCart(email);
      return newList;
    }
    await user.setProducts([], { through: ShoppingCart });
    const newList = await getAllProductsInShoppingCart(email);
    return newList;
  } catch (error) {
    return { error: error.message };
  }
};
const addWishToList = async (pkUser, pkProduct) => {
  try {
    const user = await User.findByPk(pkUser);
    const productToAdd = await Product.findByPk(pkProduct);
    await user.addWishlist(productToAdd, {
      through: "WishlistProduct", // especificar la tabla intermedia a utilizar
    });
    const listWish = await getAllWishes(pkUser);
    return listWish;
  } catch (error) {
    return { error: error.message };
  }
};   
const removeWishToList = async (pkUser, pkProduct) => {
  try {
    const user = await User.findByPk(pkUser);
    const productToAdd = await Product.findByPk(pkProduct);
    await user.removeWishlist(productToAdd, {
      through: "WishlistProduct", // especificar la tabla intermedia a utilizar
    });
    const listWish = await getAllWishes(pkUser);
    return listWish;
  } catch (error) {
    return { error: error.message };
  }
};
const getAllWishes = async (email) => {
  try {
    const user = await User.findByPk(email);
    const friendList = await user.getWishlist();
    return friendList;
  } catch (error) {
    return { error: error.message };
  }
};

const addNewComment = async (email, comment, productId, date, image, stars) => {
  const newComment = await Comment.build({
    //tengo que mejorar esto porque no anda
    comment: comment,
    date,
    userId: email,
    productId: productId,
    image,
    stars
  });
  await newComment.save();
  return newComment;
};

const getAllCommentOfUser = async (email) => {
  const commentOfUser = await Comment.findAll({
    where: { userId: email },
  });
  return commentOfUser;
};

const getAllCommentOfProduct = async (productId) => {
  const commentOfUser = await Comment.findAll({
    where: { productId: productId },
  });
  return commentOfUser;
};


module.exports = {
  addFriends,
  getAllUsers,
  addUser,
  addProductInShoppingCartForUser,
  addWishToList,
  getAllFriends,
  getAllProductsInShoppingCart,
  getAllWishes,
  addNewComment,
  getAllCommentOfUser,
  getAllCommentOfProduct,
  deleteProductinShoppingCart,
  acceptFriend,
  removeOrRejectedFriend,
  getAllFriendsPending,
  addAllProductInShoppingCartForUser,
  removeWishToList,
  searchFriendsByEmail
};
