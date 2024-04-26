// Import required modules
import express from 'express';
import http from 'http';
import serverConfig from './server';
import getDb from './config/db';
import { routes } from './routes/index';
import config from './config/config';
import expressConfig from './express';
import { S3Client } from '@aws-sdk/client-s3';
import {consumeStudent} from "../src/events/studentConsumer"
import expressValidator from 'express-validator';
import dependencies from './config/dependencies';

// Create an Express app instance
const s3 = new S3Client({
    region: 'Asia Pacific (Mumbai) ap-south-1',
    credentials: {
        accessKeyId: 'YOUR_ACCESS_KEY',
        secretAccessKey: 'YOUR_SECRET_KEY',
    },
});
const app = express();
const router = express.Router();

// Create an HTTP server instance using the Express app
const server = http.createServer(app);

// Connect to the database using the configuration from "config.js"
getDb(config);

// Configure Express settings and middleware
expressConfig(app);

// Use express-validator middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Replace expressValidator() with expressValidator.validator() if you face any issues


// Define your routes
app.use('/api', routes(dependencies));

// Start the server
serverConfig(server, config).startServer();


 consumeStudent()
