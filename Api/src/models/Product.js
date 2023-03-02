const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("Product",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        background_image:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        rating:{
            type:DataTypes.DECIMAL(10,2),
        },
        playtime:{
            type:DataTypes.INTEGER,
        },
        price:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false,
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        created:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    },
    {timestamps:false}
    )
}
