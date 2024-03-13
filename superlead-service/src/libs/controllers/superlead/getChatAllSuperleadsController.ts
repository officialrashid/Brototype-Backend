
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getChatAllSuperleads_Usecase}
    } = dependencies
 const getChatAllSuperleadsController = async (req:Request,res:Response)=>{
    const response = await getChatAllSuperleads_Usecase(dependencies).executeFunction()
    res.status(201).json(response)
    
 }
 return getChatAllSuperleadsController;
}
