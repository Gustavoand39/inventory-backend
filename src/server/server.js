import express from "express";
import http from "http";
import bodyParser from "body-parser";

import authPath from "../routes/authPath.js";
import usersPath from "../routes/usersPath.js";
import productsPath from "../routes/productsPath.js";
import inventoryPath from "../routes/inventoryPath.js";

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
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  // Método para definir las rutas
  routes() {
    this.app.use("/auth", authPath);
    this.app.use("/users", usersPath);
    this.app.use("/products", productsPath);
    this.app.use("/inventory", inventoryPath);
  }

  // Método para iniciar el servidor
  start() {
    server.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

export default Server;
