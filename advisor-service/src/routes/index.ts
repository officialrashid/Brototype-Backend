
import advisorsRoutes from './advisors/advisors.routes'
import express from "express";

export const routes  =(dependencies:any)=>{
    const routes = express.Router()
    routes.use('/advisors',advisorsRoutes(dependencies));
    return routes;
}