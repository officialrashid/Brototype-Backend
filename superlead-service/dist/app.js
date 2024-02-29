"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import required modules
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("./server"));
const db_1 = __importDefault(require("./config/db"));
const index_1 = require("./routes/index");
const config_1 = __importDefault(require("./config/config"));
const express_1 = __importDefault(require("./express"));
const express_2 = __importDefault(require("express"));
// Create an Express app instance
const app = (0, express_2.default)();
// Create an HTTP server instance using the Express app
const server = http_1.default.createServer(app);
// Connect to the database using the configuration from "config.js"
(0, db_1.default)(config_1.default);
// Configure Express settings and middleware
(0, express_1.default)(app);
// Set up the routes for the app using the Express instance
(0, index_1.routes)(app, express_2.default);
// Start the server
(0, server_1.default)(server, config_1.default).startServer();
