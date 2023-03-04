const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("ProductsStores",{
        ProductId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
        },
        StoreId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
        },
    },
    {timestamps:false}
    )
}
