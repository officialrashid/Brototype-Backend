
import { Request,Response } from "express";

export default (dependencies:any)=>{
    const {
        useCase: { getExtendRequest_Usecase }
    } = dependencies
 const getExtendRequestController = async (req:Request,res:Response)=>{
    const {  studentId } = req.params;
  
    console.log(studentId,"batchId coming to course completion grap");
    if(!studentId){
        res.status(400).json({message:"student not found"})
    }
    const response = await getExtendRequest_Usecase(dependencies).executeFunction(studentId)
     if(response){
        res.status(201).json(response)
     }  
 }
 return getExtendRequestController;
}
