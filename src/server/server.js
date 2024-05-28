const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

const authPath = require("../routes/authPath");
const usersPath = require("../routes/usersPath");
const productsPath = require("../routes/productsPath");
const categoriesPath = require("../routes/categoriesPath");
const inventoryLogPath = require("../routes/inventoryLogPath");
const uploadFilePath = require("../routes/uploadFilePath");

class Server {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.port = process.env.API_PORT || 3000;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(
      cors({
        origin: "http://localhost:5173",
        methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        allowedHeaders:
          "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept",
        credentials: true,
      })
    );

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(fileUpload());

    // Servir archivos estáticos desde el directorio 'public/uploads'
    this.app.use(
      "/uploads",
      express.static(path.join(__dirname, "../../public/uploads"))
    );
  }

  routes() {
    this.app.use("/auth", authPath);
    this.app.use("/users", usersPath);
    this.app.use("/products", productsPath);
    this.app.use("/categories", categoriesPath);
    this.app.use("/inventory", inventoryLogPath);
    this.app.use("/upload", uploadFilePath);
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
