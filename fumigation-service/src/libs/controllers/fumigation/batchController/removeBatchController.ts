
import { Request,Response } from "express";

// remove batch controller
export default (dependencies:any)=>{
    
    const {
        useCase: { removeBatch_Usecase}
    } = dependencies
 const removeBatchController = async (req:Request,res:Response)=>{
    try{
        const {batchId} = req.body
        const response = await  removeBatch_Usecase(dependencies).excutefunction(batchId) // call the usecase function and send the batchId
        res.status(201).json(response)
    } catch(err){
        res.status(500).json({err:"Internal server error"}) // handle exception
    }
  
 }
 return removeBatchController;
}
