
import studentRoutes from '../routes/students/students.routes'
import express from "express";

export const routes  =(dependencies:any)=>{
    const routes = express.Router()
    routes.use('/students',studentRoutes(dependencies));
    return routes;
}