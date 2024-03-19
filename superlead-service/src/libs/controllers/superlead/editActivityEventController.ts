
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {editActivityEvent_Usecase}
    } = dependencies
 const editActivityEventController = async (req:Request,res:Response)=>{
    console.log(req.body,"LLLLLLLL:::)))((((():::::::");
    
    const response = await editActivityEvent_Usecase(dependencies).executeFunction(req.body)
    res.status(201).json(response)
    
 }
 return editActivityEventController;
}
