const { DataTypes } = require("sequelize");

const connection = require("../db/connection.js");

const Category = connection.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
  }
);

module.exports = Category;
