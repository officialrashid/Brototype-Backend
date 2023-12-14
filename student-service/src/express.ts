import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";

const expressConfig = (app: Express): void => {
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use(cors({
        origin: [
            'http://localhost:3001',
            'http://localhost:3000',
            'http://localhost:5173',
        ], // Update with your client's origin
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // Allow credentials (cookies, etc.)
    }));
};

export default expressConfig;
