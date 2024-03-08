
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getProfile_Usecase}
    } = dependencies
 const getProfileController = async (req:Request,res:Response)=>{
    const {superleadId} = req.params
    const response = await getProfile_Usecase(dependencies).executeFunction(superleadId)
    res.status(201).json(response)
    
 }
 return getProfileController;
}
