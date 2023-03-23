const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("User",{
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        image:{
            type:DataTypes.STRING,
        },
        email:{
            type:DataTypes.STRING,
            primaryKey:true,
            allowNull: false,
            unique: true
        },
        admin:{
            type:DataTypes.BOOLEAN,
            allowNull: false,
        },
        blocked:{
            type:DataTypes.BOOLEAN,
            allowNull: false,
        },
        secret:{
            type:DataTypes.STRING,
            allowNull: false,
        }
    },
    {timestamps:false}
    );
};


