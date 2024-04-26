
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {advisorLogin_Usecase}
    } = dependencies
 const advisorLoginController = async (req:Request,res:Response)=>{
    const {uniqueId} = req.body
    const response = await advisorLogin_Usecase(dependencies).executeFunction(uniqueId)
    res.status(201).json(response)
    
 }
 return advisorLoginController;
}
