
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getAllStudentsStatus_Usecase}
    } = dependencies
 const getAllStudentsStatusController = async (req:Request,res:Response)=>{
    const {uniqueId} = req.params
    const response = await getAllStudentsStatus_Usecase(dependencies).executeFunction(uniqueId)
    res.status(201).json(response)
    
 }
 return getAllStudentsStatusController;
}
