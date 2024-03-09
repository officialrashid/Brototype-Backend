
import { Request,Response } from "express";

// get All fumigatio pending students
export default (dependencies:any)=>{
    
    const {
        useCase: { getPerPageStudent_Usecase}
    } = dependencies
 const getPerPageStudentController = async (req:Request,res:Response)=>{
    try{
        const {hubLocation,selectedPerPage} = req?.query
        const response = await getPerPageStudent_Usecase(dependencies).excutefunction(hubLocation,selectedPerPage) // call the excute function define to usecase
        res.status(201).json(response) // return response
    } catch(err){
        res.status(500).json({err:"Internal Server Error"}) //  handle exception
    }
   
    
 }
 return getPerPageStudentController; // return in this controller
}
