const { where } = require("sequelize");
const { Product, Genre, Image, User } = require("../../db");

const verifyIsAdmin = async (emailAdmin, secret) => {
  //console.log()("verificando si es admin");
  if (!secret) return false;
  const adminFound = await User.findByPk(emailAdmin);
  //console.log()("verificandoooo--->", adminFound);
  if (!adminFound.admin) return false;
  if (adminFound.secret === secret) {
    //console.log()("si es admin");

    return true;
  }
  return false;
};
const createFirstAdmin = async (emailAdmin, secret) => {
  const adminList = await User.findAll({ where: { admin: true } });
  if (adminList.length) return false;
  const firstAdmin = await User.findByPk(emailAdmin);
  firstAdmin.admin = true;
  firstAdmin.secret = secret;
  await firstAdmin.save();
  //console.log()("creando primer admin");
  return firstAdmin;
};
const blockedUser = async (emailUser) => {
  const userByBlock = await User.findByPk(emailUser);
  userByBlock.blocked = !userByBlock.blocked;
  await userByBlock.save();
  const userBlockedList = await User.findAll({ where: { blocked: true } });
  return userBlockedList;
};
const makeAdmin = async (emailUser, newSecret) => {
  const newAdmin = await User.findByPk(emailUser);
  newAdmin.admin = !newAdmin.admin;
  newAdmin.secret = newSecret;
  await newAdmin.save();
  const userAdminList = await User.findAll({ where: { admin: true } });
  return userAdminList;
};

const changePropertyProducts = async (propertys) => {
  const {
    id,
    name,
    background_image,
    rating,
    playtime,
    price,
    description,
    released,
    state,
    genres,
    images,
  } = propertys;
  //console.log()(propertys)
  const productByModify = await Product.findByPk(id);
  if (name) {
    productByModify.name = name;
    await productByModify.save();
  }
  if (background_image) {
    productByModify.background_image = background_image;
    await productByModify.save();
  }
  if (rating) {
    productByModify.rating = rating;
    await productByModify.save();
  }
  if (playtime) {
    productByModify.playtime = playtime;
    await productByModify.save();
  }
  if (price) {
    productByModify.price = price;
    await productByModify.save();
  }
  if (description) {
    productByModify.description = description;
    await productByModify.save();
  }
  if (released) {
    productByModify.released = released;
    await productByModify.save();
  }
  if (state === false || state === true) {
    productByModify.state = state;
    await productByModify.save();
  }
  if (genres) await associationGenresWithProduct(productByModify, genres);
  return productByModify;
};
const associationGenresWithProduct = async (productByModify, genres) => {
  await productByModify.setGenres([]);
  const genresArrayModify = genres.map((nameGenre) => {
    if(nameGenre.toUpperCase() === 'RPG') {
        return {name: nameGenre.toUpperCase()}
    }
    const camelCase = nameGenre[0].toUpperCase() + nameGenre.slice(1, nameGenre.length).toLowerCase()    
    return { name: camelCase };
  });
  await Promise.all(
    genresArrayModify.map(async (genre) => {
      return Genre.findOrCreate({ where: { name: genre.name } }).then(
        ([genre]) => productByModify.addGenre(genre)
      );
    })
  );
};

module.exports = {
  changePropertyProducts,
  blockedUser,
  makeAdmin,
  verifyIsAdmin,
  createFirstAdmin,
};

// https://pbs.twimg.com/profile_images/1069252636950609925/XR1jBAn6_400x400.jpg
