
import fumigationRoutes from './fumigation/fumigation.routes'
import express from "express";

export const routes  =(dependencies:any)=>{
    const routes = express.Router()
    routes.use('/fumigation',fumigationRoutes(dependencies));
    return routes;
}