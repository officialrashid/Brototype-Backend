
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: { getAllPendingStudents_Usecase}
    } = dependencies
 const getAllPendingStudentsController = async (req:Request,res:Response)=>{
    console.log("PPPPpppppppppppp09090");
    
    const response = await  getAllPendingStudents_Usecase(dependencies).excutefunction()
    res.status(201).json(response)
    
 }
 return getAllPendingStudentsController;
}
