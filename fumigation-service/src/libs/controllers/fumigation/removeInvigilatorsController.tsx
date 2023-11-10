
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: { removeInvigilator_Usecase}
    } = dependencies
 const removeInvigilatorsController = async (req:Request,res:Response)=>{
 
    const {invigilatorId} = req.body
    const response = await  removeInvigilator_Usecase(dependencies).excutefunction(invigilatorId)
    res.status(201).json(response)
    
 }
 return removeInvigilatorsController;
}
