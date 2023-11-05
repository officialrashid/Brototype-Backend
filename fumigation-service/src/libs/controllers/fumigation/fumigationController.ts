
import { Request,Response } from "express";

// Enquerie Students Controller
export default (dependencies:any)=>{
    
    const {
        useCase: {fumigation_Usecase}
    } = dependencies
 const fumigationController = async (req:Request,res:Response)=>{
    const {name,email,phone,qualification,preferredLocation} = req.body //handle destructure 
    const response = await fumigation_Usecase(dependencies).excutefunction(name,email,phone,qualification,preferredLocation) //pass to body
    res.status(201).json(response)
    
 }
 return fumigationController; // return function
}
