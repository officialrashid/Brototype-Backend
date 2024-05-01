
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getAllAdvisors_Usecase}
    } = dependencies
 const getAllAdvisorsController = async (req:Request,res:Response)=>{
    const response = await getAllAdvisors_Usecase(dependencies).executeFunction()
    res.status(201).json(response)
    
 }
 return getAllAdvisorsController;
}
