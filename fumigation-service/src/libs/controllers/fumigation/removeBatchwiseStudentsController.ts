
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: { removeBatchwiseStudents_Usecase}
    } = dependencies
 const removeBatchwiseStudentsController = async (req:Request,res:Response)=>{
 
    const {studentId,batchId} = req.body
    const response = await  removeBatchwiseStudents_Usecase(dependencies).excutefunction(studentId,batchId)
    res.status(201).json(response)
    
 }
 return removeBatchwiseStudentsController;
}
