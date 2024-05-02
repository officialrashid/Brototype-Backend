
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getStudentProfile_Usecase}
    } = dependencies
 const getStudentProfileController = async (req:Request,res:Response)=>{
    const {studentId} = req?.params
    const response = await getStudentProfile_Usecase(dependencies).executeFunction(studentId)
    res.status(201).json(response)
    
 }
 return getStudentProfileController;
}
