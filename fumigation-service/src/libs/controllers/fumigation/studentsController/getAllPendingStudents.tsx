
import { Request,Response } from "express";

// get All fumigatio pending students
export default (dependencies:any)=>{
    
    const {
        useCase: { getAllPendingStudents_Usecase}
    } = dependencies
 const getAllPendingStudentsController = async (req:Request,res:Response)=>{
    try{
        const response = await  getAllPendingStudents_Usecase(dependencies).excutefunction() // call the excute function define to usecase
        res.status(201).json(response) // return response
    } catch(err){
        res.status(500).json({err:"Internal Server Error"}) //  handle exception
    }
   
    
 }
 return getAllPendingStudentsController; // return in this controller
}
