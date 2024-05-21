const { DataTypes } = require("sequelize");

const connection = require("../db/connection.js");

const Role = connection.define("Role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

module.exports = Role;
