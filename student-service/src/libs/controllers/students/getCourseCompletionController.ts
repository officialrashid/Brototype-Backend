
import { Request,Response } from "express";

export default (dependencies:any)=>{
    const {
        useCase: { getCourseCompletion_Usecase }
    } = dependencies
 const getCourseCompletionController = async (req:Request,res:Response)=>{
    const {  studentId ,batchId } = req.query;
  
    console.log(studentId,batchId,"batchId coming to course completion grap");
    
    const response = await getCourseCompletion_Usecase(dependencies).executeFunction(studentId,batchId)
    console.log(response,"response in controller");
    
    res.status(201).json(response)
    
 }
 return getCourseCompletionController;
}
