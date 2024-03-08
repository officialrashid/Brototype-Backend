
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {profileUpdate_Usecase}
    } = dependencies
 const profileUpdateController = async (req:Request,res:Response)=>{
    const {file} = req
    console.log(req.body,"req.bodyyy cominggggggggggggg");
    
    
    const response = await profileUpdate_Usecase(dependencies).executeFunction(req.body,file)
    res.status(201).json(response)
    
 }
 return profileUpdateController;
}
