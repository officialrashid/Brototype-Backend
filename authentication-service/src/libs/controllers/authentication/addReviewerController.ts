
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {addReviewer_Usecase}
    } = dependencies
 const addReviewerController = async (req:Request,res:Response)=>{
    const response = await addReviewer_Usecase(dependencies).executeFunction(req.body)
    res.status(201).json(response)
    
 }
 return addReviewerController;
}
