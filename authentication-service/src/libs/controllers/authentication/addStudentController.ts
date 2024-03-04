
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {checkStudentUniqueId_Usecase}
    } = dependencies
 const addStudentController = async (req:Request,res:Response)=>{
    const response = await checkStudentUniqueId_Usecase(dependencies).executeFunction(req.body)
    res.status(201).json(response)
    
 }
 return addStudentController;
}
