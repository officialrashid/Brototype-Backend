
import { Request,Response } from "express";

export default (dependencies:any)=>{
    const {
        useCase: { getProfile_Usecase }
    } = dependencies
 const getProfileController = async (req:Request,res:Response)=>{
    const {studentId} = req.params;
    const response = await getProfile_Usecase(dependencies).executeFunction(studentId)
    console.log(response,"response in controller");
    
    res.status(201).json(response)
    
 }
 return getProfileController;
}
