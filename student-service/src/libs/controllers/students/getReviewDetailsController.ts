
import { Request,Response } from "express";

export default (dependencies:any)=>{
    const {
        useCase: { getReviewDetails_Usecase }
    } = dependencies
 const getReviewDetailsController = async (req:Request,res:Response)=>{
    const {studentId,batchId} = req.query;
    const response = await getReviewDetails_Usecase(dependencies).executeFunction(studentId,batchId)
    console.log(response,"response in controller");
    
    res.status(201).json(response)
    
 }
 return getReviewDetailsController;
}
