
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: { removeBatch_Usecase}
    } = dependencies
 const removeBatchController = async (req:Request,res:Response)=>{
 
    const {batchId} = req.body
    const response = await  removeBatch_Usecase(dependencies).excutefunction(batchId)
    res.status(201).json(response)
    
 }
 return removeBatchController;
}
