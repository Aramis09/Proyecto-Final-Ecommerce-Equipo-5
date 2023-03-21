
//**Crea la conexion con la base de datos (con sequelize) */
const {Sequelize} = require("sequelize");
const { DataTypes }= require("sequelize");
require("dotenv").config(); //**La variables de entorno quedan dispobnibles .env */
const { DB_DATA } = process.env;
const sequelize = new Sequelize(DB_DATA ,{ logging: false,timezone: '-03:00' });


//**Definicion de modelos (con sequelize)*/
const ProductModel = require("./models/Product");
const PlatformModel = require("./models/Platform");
const GenreModel = require("./models/Genre");
const ImageModel = require("./models/Image");
const StoreModel = require("./models/Store");
const ProductsPlatformsModel = require("./models/ProductsPlatforms");
const ProductsGenresModel = require("./models/ProductsGenres");
const ProductsStoresModel = require("./models/ProductsStores");
const UserModel = require("./models/User");   
const CommentModel = require("./models/Comment");
const PurchaseModel = require("./models/Purchase");
/**Instancias que definen los modelos, crea el .models: */
ProductModel(sequelize);
PlatformModel(sequelize);
GenreModel(sequelize);
ImageModel(sequelize);
StoreModel(sequelize);
ProductsPlatformsModel(sequelize);
ProductsGenresModel(sequelize);
ProductsStoresModel(sequelize);
UserModel(sequelize);
CommentModel(sequelize);
PurchaseModel(sequelize);


//**Relacionar los Modelos */
const {Product, Platform, Genre,Comment, Image, Store, User, ProductsPlatforms, ProductsGenres, ProductsStores, Purchase} = sequelize.models;

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

////////////////////////relaciones de carrito ////////////////////////////////////////
const ShoppingCart = sequelize.define('ShoppingCart', {}, { timestamps: false });
User.belongsToMany(Product, { through: ShoppingCart });
Product.belongsToMany(User, { through: ShoppingCart });

//borrar lo de abajo.
const WishlistProduct = sequelize.define('WishlistProduct', {}, { timestamps: false });
User.belongsToMany(Product, { through: WishlistProduct, as: 'Wishlist' });
Product.belongsToMany(User, { through: WishlistProduct });

const FriendUser = sequelize.define('FriendUser', {
    accept:{
        type:DataTypes.STRING,
        allowNull: true,
    } 
}, 
{ timestamps: false });
User.belongsToMany(User, { through: FriendUser, as: 'FriendInList' });

const Gift = sequelize.define('Gift', {
    idProduct:{
        type:DataTypes.INTEGER,
        allowNull:false,
    } 
}, { timestamps: false });
User.belongsToMany(User, { through: Gift, as: 'Gifts'});

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Comment.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Comment, { foreignKey: 'productId' });

Product.hasMany(Purchase);
Purchase.belongsTo(Product);
User.hasMany(Purchase);
Purchase.belongsTo(User);
//**Exportarla para poder trabajar con los modelos en los controllers */
module.exports={sequelize, ...sequelize.models};


