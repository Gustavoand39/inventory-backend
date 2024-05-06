// Archivo principal de la aplicación
import Server from "./server/server.js";

// Variables de entorno
import dotenv from "dotenv";
dotenv.config();

// Instancia de la clase Server
const server = new Server();

// Ejecución del servidor
server.start();
