
import { Request,Response } from "express";

export default (dependencies:any)=>{
    const {
        useCase: { getPerPageStudent_Usecase }
    } = dependencies
 const getPerPageStudentController = async (req:Request,res:Response)=>{
    const {  superleadUniqueId,perPage } = req.query;

    if(!superleadUniqueId){
        res.status(400).json({message:"student not found"})
    }
    const response = await getPerPageStudent_Usecase(dependencies).executeFunction(superleadUniqueId,perPage)
     if(response){
        res.status(201).json(response)
     }  
 }
 return getPerPageStudentController;
}
