const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("Genre",{
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
