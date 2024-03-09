
import { Request,Response } from "express";

// get All fumigatio pending students
export default (dependencies:any)=>{
    
    const {
        useCase: { getAllFumigationStudents_Usecase}
    } = dependencies
 const getAllFumigationStudentsController = async (req:Request,res:Response)=>{
    try{
        const {hubLocation,currentPage} = req?.query
        const response = await  getAllFumigationStudents_Usecase(dependencies).excutefunction(hubLocation,currentPage) // call the excute function define to usecase
        res.status(201).json(response) // return response
    } catch(err){
        res.status(500).json({err:"Internal Server Error"}) //  handle exception
    }
   
    
 }
 return getAllFumigationStudentsController; // return in this controller
}
