
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {studentLogin_Usecase}
    } = dependencies
 const studentLoginController = async (req:Request,res:Response)=>{
    const {uniqueId} = req.body
    
    const response = await studentLogin_Usecase(dependencies).executeFunction(uniqueId)
    console.log(response,"[][][]]");
    res.status(201).json(response)
    
 }
 return studentLoginController;
}
