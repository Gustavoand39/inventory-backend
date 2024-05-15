import express from "express";
import http from "http";
import bodyParser from "body-parser";

import authPath from "../routes/authPath.js";
import usersPath from "../routes/usersPath.js";
import rolesPath from "../routes/rolesPath.js";
import productsPath from "../routes/productsPath.js";
import categoriesPath from "../routes/categoriesPath.js";
import inventoryPath from "../routes/inventoryPath.js";
import movementsPath from "../routes/movementsPath.js";
import uploadFilePath from "../routes/uploadFilePath.js";

const app = express();
const server = http.createServer(app);

class Server {
  // Constructor de la clase
  constructor() {
    this.app = app;
    this.server = server;
    this.port = process.env.API_PORT;
    this.middlewares();
    this.routes();
  }

  // Método para definir los middlewares
  middlewares() {
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "http://localhost:5173");
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Content-Type", "application/json");
      next();
    });
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  // Método para definir las rutas
  routes() {
    this.app.use("/auth", authPath);
    this.app.use("/users", usersPath);
    this.app.use("/roles", rolesPath);
    this.app.use("/products", productsPath);
    this.app.use("/categories", categoriesPath);
    this.app.use("/inventory", inventoryPath);
    this.app.use("/movements", movementsPath);
    this.app.use("/upload", uploadFilePath);
  }

  // Método para iniciar el servidor
  start() {
    server.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

export default Server;
