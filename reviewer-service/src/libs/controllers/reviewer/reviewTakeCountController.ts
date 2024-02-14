
import { Request,Response } from "express";
// import {validationResult} from "express-validator"

export default (dependencies:any)=>{
    
    const {
        useCase: { reviewTakeCount_Usecase }
    } = dependencies
 const reviewTakeCountController = async (req:Request,res:Response)=>{
    const {reviewerId} = req.params
    console.log(reviewerId,"reviewrId take count controller");
    
    const response = await reviewTakeCount_Usecase(dependencies).executeFunction(reviewerId)
    res.status(201).json(response)
    
 }
 return reviewTakeCountController;
}

