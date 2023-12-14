
import studentsRoutes from './student/students.routes'
import express from "express";

export const routes  =(dependencies:any)=>{
    const routes = express.Router()
    routes.use('/student',studentsRoutes(dependencies));
    return routes;
}