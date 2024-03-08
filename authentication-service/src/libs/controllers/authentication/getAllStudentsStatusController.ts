
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getAllStudentsStatus_Usecase}
    } = dependencies
 const getAllStudentsStatusController = async (req:Request,res:Response)=>{
    const {superleadUniqueId,currentPage} = req.query
    const response = await getAllStudentsStatus_Usecase(dependencies).executeFunction(superleadUniqueId,currentPage)
    res.status(201).json(response)
    
 }
 return getAllStudentsStatusController;
}
