const { DataTypes } = require("sequelize");

const connection = require("../db/connection.js");

const Movement = connection.define("Movement", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

module.exports = Movement;
