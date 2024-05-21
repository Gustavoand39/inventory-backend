// Archivo principal de la aplicación
const Server = require("./server/server.js");

// Variables de entorno
const dotenv = require("dotenv");
dotenv.config();

// Instancia de la clase Server
const server = new Server();

// Ejecución del servidor
server.start();
