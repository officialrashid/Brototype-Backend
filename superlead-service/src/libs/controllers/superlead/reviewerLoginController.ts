
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {reviewerLogin_Usecase}
    } = dependencies
 const reviewerLoginController = async (req:Request,res:Response)=>{
    const {uniqueId} = req.body
    
    const response = await reviewerLogin_Usecase(dependencies).executeFunction(uniqueId)
    console.log(response,"[][][]]");
    res.status(201).json(response)
    
 }
 return reviewerLoginController;
}
