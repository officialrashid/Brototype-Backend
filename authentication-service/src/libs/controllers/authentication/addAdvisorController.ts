
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {addAdvisor_Usecase}
    } = dependencies
 const addAdvisorController = async (req:Request,res:Response)=>{
    const response = await addAdvisor_Usecase(dependencies).executeFunction(req.body)
    res.status(201).json(response)
    
 }
 return addAdvisorController;
}
