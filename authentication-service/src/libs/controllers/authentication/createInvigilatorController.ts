
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {createInvigilator_Usecase}
    } = dependencies
 const createInvigilatorController = async (req:Request,res:Response)=>{
    const response = await createInvigilator_Usecase(dependencies).executeFunction(req.body)
    console.log(response,"[][][]]");
    res.status(201).json(response)
    
 }
 return createInvigilatorController;
}
