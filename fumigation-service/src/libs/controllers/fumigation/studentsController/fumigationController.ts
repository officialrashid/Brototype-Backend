
import { Request,Response } from "express";

// Enquerie Students Controller
export default (dependencies:any)=>{
    
    const {
        useCase: {fumigation_Usecase}
    } = dependencies
 const fumigationController = async (req:Request,res:Response)=>{
    try{
        const {name,email,phone,qualification,prefferredLocation} = req.body //handle destructure 
        const response = await fumigation_Usecase(dependencies).excutefunction(name,email,phone,qualification,prefferredLocation) //pass to body
        res.status(201).json(response) // return response
    } catch(err){
        res.status(500).json({err:"Internal Server Error"}) // return exception
    }
   
    
 }
 return fumigationController; // return function
}
