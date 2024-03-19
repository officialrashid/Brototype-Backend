
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getActivityEvents_Usecase}
    } = dependencies
 const getActivityEventsController = async (req:Request,res:Response)=>{
    const {superleadId} = req.params
    const response = await getActivityEvents_Usecase(dependencies).executeFunction(superleadId)
    res.status(201).json(response)
    
 }
 return getActivityEventsController;
}
