
import { Request,Response } from "express";

export default (dependencies:any)=>{
    const {
        useCase: { getProfile_Usecase }
    } = dependencies
 const getProfileController = async (req:Request,res:Response)=>{
    const {studentId} = req.params;
    if(!studentId){
        res.status(400).json({message:"batch not found"})
    }
    const response = await getProfile_Usecase(dependencies).executeFunction(studentId)
    console.log(response,"response in controller");
    
    res.status(201).json(response)
    
 }
 return getProfileController;
}
