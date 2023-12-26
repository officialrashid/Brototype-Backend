
import reviewerRoutes from './reviewer/reviewer.routes'
import express from "express";

export const routes  =(dependencies:any)=>{
    const routes = express.Router()
    routes.use('/auth',reviewerRoutes(dependencies));
    return routes;
}