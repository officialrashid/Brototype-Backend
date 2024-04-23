// Import required modules
import http from "http";
import serverConfig from "./server";
import getDb from "./config/db";
import { routes } from "./routes/index";
import config from "./config/config";
import expressConfig from "./express";
import express from 'express';
import dependencies from "./config/dependencies";
import {consumeReviewer} from "./events/reviewerConsumer"
// Create an Express app instance
const app = express();
const router = express.Router()
// Create an HTTP server instance using the Express app
const server = http.createServer(app);

// Connect to the database using the configuration from "config.js"
getDb(config);

// Configure Express settings and middleware
expressConfig(app);

// Set up the routes for the app using the Express instance
app.use("/api", routes(dependencies));

// Start the server
serverConfig(server, config).startServer();

// setInterval(async() => {
//     await consumeAuthentication();
// }, 10000);
