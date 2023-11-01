
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: { getBatchwiseStudents_Usecase}
    } = dependencies
 const getBatchwiseStudentsController = async (req:Request,res:Response)=>{
    const {batchId} = req.body
    const response = await  getBatchwiseStudents_Usecase(dependencies).excutefunction(batchId)
    res.status(201).json(response)
    
 }
 return getBatchwiseStudentsController;
}
