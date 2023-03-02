const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("Image",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        image_path:{
            type:DataTypes.STRING,
            validate:{isUrl: true, notNull: true, notEmpty: true},
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
