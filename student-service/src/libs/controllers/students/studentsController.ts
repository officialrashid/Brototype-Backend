
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {student_Usecase}
    } = dependencies
 const studentController = async (req:Request,res:Response)=>{
    const response = await student_Usecase(dependencies).excutefunction(req.body)
    console.log(response,"[][][]]");
    res.json(response)
    
 }
 return studentController;
}
