
import chatAndVideoRoutes from './chatAndVideo/chatAndVideo.routes'
import express from "express";

export const routes  =(dependencies:any)=>{
    const routes = express.Router()
    routes.use('/chat-and-video',chatAndVideoRoutes(dependencies));
    return routes;
}