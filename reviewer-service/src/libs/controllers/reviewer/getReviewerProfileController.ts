
import { Request,Response } from "express";

export default (dependencies:any)=>{
    const {
        useCase: { getProfile_Usecase }
    } = dependencies
 const getReviewerProfileController = async (req:Request,res:Response)=>{
    const {reviewerId} = req.params;
    const response = await getProfile_Usecase(dependencies).executeFunction(reviewerId)

    
    res.status(201).json(response)
    
 }
 return getReviewerProfileController;
}
