const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const authPath = require("../routes/authPath.js");
const usersPath = require("../routes/usersPath.js");
const rolesPath = require("../routes/rolesPath.js");
const productsPath = require("../routes/productsPath.js");
const categoriesPath = require("../routes/categoriesPath.js");
const inventoryPath = require("../routes/inventoryPath.js");
const movementsPath = require("../routes/movementsPath.js");
const uploadFilePath = require("../routes/uploadFilePath.js");

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

    this.app.use(fileUpload());
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

module.exports = Server;
