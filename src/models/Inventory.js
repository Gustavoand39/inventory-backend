const { DataTypes } = require("sequelize");

const connection = require("../db/connection.js");
const Movement = require("./Movement.js");
const Product = require("./Product.js");
const User = require("./User.js");

const Inventory = connection.define(
  "Inventory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    movementId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Movement",
        key: "id",
      },
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
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "inventory",
    timestamps: true,
  }
);

Inventory.belongsTo(Movement, { foreignKey: "movementId" });
Movement.hasMany(Inventory, { foreignKey: "movementId" });

Inventory.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(Inventory, { foreignKey: "productId" });

Inventory.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Inventory, { foreignKey: "userId" });

module.exports = Inventory;
