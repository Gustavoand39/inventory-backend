import { DataTypes } from "sequelize";

import connection from "../db/connection.js";

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

export default Movement;
