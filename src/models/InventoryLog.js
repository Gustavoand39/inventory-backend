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
      allowNull: true,
      references: {
        model: "Product",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "User",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
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
      allowNull: true,
    },
  },
  {
    tableName: "inventory_log",
    timestamps: true,
  }
);

InventoryLog.belongsTo(Product, {
  foreignKey: "productId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Product.hasMany(InventoryLog, { foreignKey: "productId" });

InventoryLog.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
User.hasMany(InventoryLog, { foreignKey: "userId" });

module.exports = InventoryLog;
