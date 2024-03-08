
import { Request,Response } from "express";


export default (dependencies:any)=>{
    const {
        useCase: { getAllStudents_Usecase }
    } = dependencies
 const getAllStudentsController = async (req:Request,res:Response)=>{
    console.log(req.params,"paramss loggggg");
    
    const {  superleadUniqueId ,currentPage  } = req.query;
console.log(superleadUniqueId,"superleadUniqueId");
console.log(currentPage,"currentPage");
    const response = await getAllStudents_Usecase(dependencies).executeFunction(superleadUniqueId,currentPage)
     if(response){
        res.status(201).json(response)
     }  
 }
 return getAllStudentsController;
}
