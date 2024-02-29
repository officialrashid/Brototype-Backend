
import superleadRoutes from './superlead/superlead.routes'
import express from "express";

export const routes  =(dependencies:any)=>{
    const routes = express.Router()
    routes.use('/superlead',superleadRoutes(dependencies));
    return routes;
}