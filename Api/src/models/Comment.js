const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("Comment",{
        Comment:{
            type:DataTypes.TEXT,
            allowNull: false,
        }, 
    },
    {timestamps:false}
    );
};