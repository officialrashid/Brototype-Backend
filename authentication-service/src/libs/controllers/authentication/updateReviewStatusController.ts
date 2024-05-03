
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {updateReviewStatus_Usecase}
    } = dependencies
 const updateReviewStatusController = async (req:Request,res:Response)=>{
    const {studentId,currentWeek,status} = req.body
    const response = await updateReviewStatus_Usecase(dependencies).executeFunction(studentId,currentWeek,status)
    res.status(201).json(response)
    
 }
 return updateReviewStatusController;
}
