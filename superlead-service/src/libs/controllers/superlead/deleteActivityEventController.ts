
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {deleteActivityEvent_Usecase}
    } = dependencies
 const deleteActivityEventController = async (req:Request,res:Response)=>{
    const response = await deleteActivityEvent_Usecase(dependencies).executeFunction(req.query)
    res.status(201).json(response)
    
 }
 return deleteActivityEventController;
}
