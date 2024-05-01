
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {updateAdvisorStatus_Usecase}
    } = dependencies
 const updateAdvisorStatusController = async (req:Request,res:Response)=>{
    const {advisorId,action} = req.body
    const response = await updateAdvisorStatus_Usecase(dependencies).executeFunction(advisorId,action)
    res.status(201).json(response)
    
 }
 return updateAdvisorStatusController;
}
