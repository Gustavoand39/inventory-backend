const { DataTypes } = require("sequelize");

const connection = require("../db/connection.js");
const Product = require("./Product.js");
const User = require("./User.js");

const InventoryLog = connection.define(
  "InventoryLog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Product",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    details: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    newState: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    oldState: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "inventory_log",
    timestamps: true,
  }
);

InventoryLog.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(InventoryLog, { foreignKey: "productId" });

InventoryLog.belongsTo(User, { foreignKey: "userId" });
User.hasMany(InventoryLog, { foreignKey: "userId" });

module.exports = InventoryLog;
