
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {updateStudentStatus_Usecase}
    } = dependencies
 const updateStudentStatusController = async (req:Request,res:Response)=>{
    const {studentId,action} = req.body
    console.log(studentId,action,"student action coming in superlead backebddd");
    
    const response = await updateStudentStatus_Usecase(dependencies).executeFunction(studentId,action)
    res.status(201).json(response)
    
 }
 return updateStudentStatusController;
}
