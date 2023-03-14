const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("ProductsGenres",{
        ProductId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
        },
        GenreId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull: false,
        },
    },
    {timestamps:false}
    )
}
