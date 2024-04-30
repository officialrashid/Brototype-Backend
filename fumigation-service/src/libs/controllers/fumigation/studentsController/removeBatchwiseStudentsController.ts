
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: { removeBatchwiseStudents_Usecase}
    } = dependencies
 const removeBatchwiseStudentsController = async (req:Request,res:Response)=>{
   try{
    const {studentId,batchId} = req.query
    console.log(studentId,batchId,"{{____----------");
    
    const response = await  removeBatchwiseStudents_Usecase(dependencies).excutefunction(studentId,batchId)
    res.status(201).json(response)
   } catch(err){
    res.status(500).json({err:"Internal server Error"})
   }
   
    
 }
 return removeBatchwiseStudentsController;
}
