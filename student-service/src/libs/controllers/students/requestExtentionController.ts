
import { Request,Response } from "express";

export default (dependencies:any)=>{
    const {
        useCase: { requestExtention_Usecase }
    } = dependencies
 const requestExtentionController = async (req:Request,res:Response)=>{
  
    const response = await requestExtention_Usecase(dependencies).executeFunction(req.body)
     if(response){
        res.status(201).json(response)
     }  
 }
 return requestExtentionController;
}
