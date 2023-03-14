const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("Friend",{
        emailFriend:{
            type:DataTypes.STRING,
            primaryKey:true,
            allowNull: false,
        }, 
    },
    {timestamps:false}
    );
};