
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {updateActivityEvent_Usecase}
    } = dependencies
 const updateActivityEventController = async (req:Request,res:Response)=>{
    console.log(req.body,"LLLLLLLL:::)))((((():::::::");
    
    const response = await updateActivityEvent_Usecase(dependencies).executeFunction(req.body)
    res.status(201).json(response)
    
 }
 return updateActivityEventController;
}
