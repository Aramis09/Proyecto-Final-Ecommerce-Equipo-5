const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("User",{
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        image:{
            type:DataTypes.STRING,
        },
        email:{
            type:DataTypes.STRING,
            primaryKey:true,
            allowNull: false,
            unique: true
        },
        admin:{
            type:DataTypes.BOOLEAN,
            allowNull: false,
        },
        blocked:{
            type:DataTypes.BOOLEAN,
            allowNull: false,
        },
        secret:{
            type:DataTypes.STRING,
            allowNull: false,
        }
    },
    {timestamps:false}
    );
};



// const userId = 1; // ID del usuario al que se le agregará el producto
// const productId = 2; // ID del producto que se agregará al carrito
// User.findByPk(userId).then(user => {
//   if (!user) {
//     throw new Error('Usuario no encontrado');
//   }
//   return Product.findByPk(productId);
// }).then(product => {
//   if (!product) {
//     throw new Error('Producto no encontrado');
//   }
//   return user.addProduct(product, { through: ShoppingCart });
// }).then(() => {
//   console.log('Producto agregado al carrito');
// }).catch(err => {
//   console.log(err);
// });
