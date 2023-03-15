const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("Image",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            unique: true,
            autoIncrement:true,
        },
        image_path:{
            type:DataTypes.TEXT,
            allowNull: false,
        },
        created:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    },
    {timestamps:false}
    )
}
