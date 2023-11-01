
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {fumigation_Usecase}
    } = dependencies
 const fumigationController = async (req:Request,res:Response)=>{
    const {name,email,phone,qualification,preferredLocation} = req.body
    const response = await fumigation_Usecase(dependencies).excutefunction(name,email,phone,qualification,preferredLocation)
    res.status(201).json(response)
    
 }
 return fumigationController;
}
