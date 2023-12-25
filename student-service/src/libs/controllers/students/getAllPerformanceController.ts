
import { Request,Response } from "express";

export default (dependencies:any)=>{
    const {
        useCase: { getAllPerformance_Usecase }
    } = dependencies
 const getCourseCompletionController = async (req:Request,res:Response)=>{
    const {  studentId ,batchId } = req.query;
  
    console.log(studentId,batchId,"batchId coming to course completion grap");
    
    const response = await getAllPerformance_Usecase(dependencies).executeFunction(studentId,batchId)
     if(response){
        res.status(201).json(response)
     }  
 }
 return getCourseCompletionController;
}
