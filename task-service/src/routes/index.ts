
import taskRoutes from './task/task.routes'
import express from "express";

export const routes  =(dependencies:any)=>{
    const routes = express.Router()
    routes.use('/task',taskRoutes(dependencies));
    return routes;
}