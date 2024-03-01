
import { Request,Response } from "express";


export default (dependencies:any)=>{
    const {
        useCase: { getAllStudents_Usecase }
    } = dependencies
 const getAllStudentsController = async (req:Request,res:Response)=>{
    console.log(req.params,"paramss loggggg");
    
    const {  uniqueId  } = req.params;

    const response = await getAllStudents_Usecase(dependencies).executeFunction(uniqueId)
     if(response){
        res.status(201).json(response)
     }  
 }
 return getAllStudentsController;
}
