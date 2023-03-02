const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("Platform",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        created:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        state:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
    },
    {timestamps:false}
    )
}
