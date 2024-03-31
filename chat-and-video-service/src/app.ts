// Import required modules
import http from "http";
import serverConfig from "./server";
import getDb from "./config/db";
import { routes } from "./routes/index";
import config from "./config/config";
import expressConfig from "./express";
import express from 'express';
import dependencies from "./config/dependencies";
import socketConnection from "../src/socket.io/socket.io";
import { Server } from "socket.io";
// import {consumeAuthentication} from "./events/authenticationConsumer"
// Create an Express app instance
const app = express();
const router = express.Router()
// Create an HTTP server instance using the Express app
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
// Connect to the database using the configuration from "config.js"
getDb(config);

// Configure Express settings and middleware
expressConfig(app);

// Set up the routes for the app using the Express instance
app.use("/api", routes(dependencies));

// Start the server

const socketServer = serverConfig(server, config).startServer();

// setInterval(async() => {
//     await consumeAuthentication();
// }, 10000);
socketConnection(io);
  