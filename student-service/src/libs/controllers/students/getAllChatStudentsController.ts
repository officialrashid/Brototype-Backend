
import { Request,Response } from "express";


export default (dependencies:any)=>{
    const {
        useCase: { getAllChatStudents_Usecase }
    } = dependencies
 const getAllChatStudentsController = async (req:Request,res:Response)=>{
    const {uniqueId} = req.params;
    const response = await getAllChatStudents_Usecase(dependencies).executeFunction(uniqueId)
     if(response){
        res.status(201).json(response)
     }  
 }
 return getAllChatStudentsController;
}
