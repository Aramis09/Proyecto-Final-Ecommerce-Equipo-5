//**Crea la conexion con la base de datos (con sequelize) */
const {Sequelize} = require("sequelize");
require("dotenv").config(); //**La variables de entorno quedan dispobnibles .env */
const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME}= process.env;
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false,
  });

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

const ProductsPlatforms_Profile = sequelize.define('ProductsPlatforms', {}, { timestamps: false });
Product.belongsToMany(Platform,{through:ProductsPlatforms_Profile});
Platform.belongsToMany(Product,{through:ProductsPlatforms_Profile});

const ProductsGenres_Profile = sequelize.define('ProductsGenres', {}, { timestamps: false });
Product.belongsToMany(Genre,{through:ProductsGenres_Profile});
Genre.belongsToMany(Product,{through:ProductsGenres_Profile});

const ProductsStores_Profile = sequelize.define('ProductsStores', {}, { timestamps: false });
Product.belongsToMany(Store,{through:ProductsStores_Profile});
Store.belongsToMany(Product,{through:ProductsStores_Profile});

Product.hasMany(Image);
Image.belongsTo(Product);

//**Exportarla para poder trabajar con los modelos en los controllers */
module.exports={sequelize, ...sequelize.models};
