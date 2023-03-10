const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("Comment",{
        Comment:{
            type:DataTypes.TEXT,
            allowNull: false,
        },
        Date:{
            type:DataTypes.DATE
        },
        Hour:{
            type:DataTypes.DATE
        } 
    },
    {timestamps:false}
    );
};