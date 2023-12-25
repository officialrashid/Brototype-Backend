
import { Request,Response } from "express";

export default (dependencies:any)=>{
    const {
        useCase: { getExtendDetails_Usecase }
    } = dependencies
 const getExtendDetailsController = async (req:Request,res:Response)=>{
    const {  studentId,batchId  } = req.query;
  
    console.log(studentId,"batchId coming to course completion grap");
    
    const response = await getExtendDetails_Usecase(dependencies).executeFunction(studentId,batchId)
     if(response){
        res.status(201).json(response)
     }  
 }
 return getExtendDetailsController;
}
