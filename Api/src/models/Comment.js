const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Comment",
    {
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      stars: {
        type: DataTypes.INTEGER,
      }
    },
    { timestamps: false }
  );
};
