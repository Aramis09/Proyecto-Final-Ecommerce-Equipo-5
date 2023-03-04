const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("ProductsPlatforms",{
        ProductId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
        },
        PlatformId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
        },
    },
    {timestamps:false}
    )
}
