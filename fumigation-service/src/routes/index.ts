
import fumigationRoutes from './fumigation/fumigation.routes'
import express from "express";
// This is base api
export const routes  =(dependencies:any)=>{
    const routes = express.Router()
    routes.use('/fumigation',fumigationRoutes(dependencies));
    return routes;
}