
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getReviewInitiators_Usecase}
    } = dependencies
 const getReviewInitiatorsController = async (req:Request,res:Response)=>{
    const {advisorId,reviewerId,studentId} = req.query
    const response = await getReviewInitiators_Usecase(dependencies).executeFunction(advisorId,reviewerId,studentId)
    res.status(201).json(response)
    
 }
 return getReviewInitiatorsController;
}
