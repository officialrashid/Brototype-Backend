
import authenticationRoutes from './authentication/authentication.routes'
import express from "express";

export const routes  =(dependencies:any)=>{
    const routes = express.Router()
    routes.use('/auth',authenticationRoutes(dependencies));
    return routes;
}