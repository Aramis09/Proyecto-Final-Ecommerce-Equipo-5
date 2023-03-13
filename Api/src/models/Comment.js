const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("Comment",{
        Comment:{
            type:DataTypes.TEXT,
            allowNull: false,
        },
        Date:{
            type:DataTypes.DATE,
            allowNull: false,
        },
        Hour:{
            type:DataTypes.DATE,
            allowNull: false,
        } 
    },
    {timestamps:false}
    );
};