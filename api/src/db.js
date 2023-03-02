//**Crea la conexion con la base de datos (con sequelize) */
const {Sequelize} = require("sequelize");
require("dotenv").config(); //**La variables de entorno quedan dispobnibles .env */
const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT}= process.env;
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pf`,{logging:false});

//**Definicion de modelos (con sequelize)*/
const ProductModel = require("./models/Product");
const PlatformModel = require("./models/Platform");
const GenreModel = require("./models/Genre");
const ImageModel = require("./models/Image");
const StoreModel = require("./models/Store");

/**Instancias que definen los modelos, crea el .models: */
ProductModel(sequelize);
PlatformModel(sequelize);
GenreModel(sequelize);
ImageModel(sequelize);
StoreModel(sequelize);


//**Relacionar los Modelos */
const {Product, Platform, Genre, Image, Store} = sequelize.models;
Product.belongsToMany(Platform,{through:"ProductsPlatforms"});
Platform.belongsToMany(Product,{through:"ProductsPlatforms"});

Product.belongsToMany(Genre,{through:"ProductsGenres"});
Genre.belongsToMany(Product,{through:"ProductsGenres"});

Product.belongsToMany(Store,{through:"ProductsStores"});
Store.belongsToMany(Product,{through:"ProductsStores"});

Product.hasMany(Image);
Image.belongsTo(Product);

//**Exportarla para poder trabajar con los modelos en los controllers */
module.exports={sequelize, ...sequelize.models, DB_PORT};
