
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {updateReviewerStatus_Usecase}
    } = dependencies
 const updateReviewerStatusController = async (req:Request,res:Response)=>{
    const {reviewerId,action} = req.body
    console.log(reviewerId,action,"student action coming in superlead backebddd");
    const response = await updateReviewerStatus_Usecase(dependencies).executeFunction(reviewerId,action)
    res.status(201).json(response)
    
 }
 return updateReviewerStatusController;
}
