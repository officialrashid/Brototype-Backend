
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {updateStudentPlaced_Usecase}
    } = dependencies
 const updateStudentPlacedController = async (req:Request,res:Response)=>{  
    const {studentId,action,confirm,date} = req.body
    console.log(studentId,action,confirm,date,"boduyysssss");
    
    const response = await updateStudentPlaced_Usecase(dependencies).executeFunction(studentId,action,confirm,date)
    res.status(201).json(response)
    
 }
 return updateStudentPlacedController;
}
