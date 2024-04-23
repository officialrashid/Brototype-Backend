
import { Request,Response } from "express";


export default (dependencies:any)=>{
    const {
        useCase: { getReviewStudents_Usecase }
    } = dependencies
 const getReviewStudentsController = async (req:Request,res:Response)=>{
    const response = await getReviewStudents_Usecase(dependencies).executeFunction()
     if(response){
        res.status(201).json(response)
     }  
 }
 return getReviewStudentsController;
}
