
import { Request,Response } from "express";

export default (dependencies:any)=>{
    const {
        useCase: { getBatchwiseBestStd_Usecase }
    } = dependencies
 const getBatchwiseBestStd = async (req:Request,res:Response)=>{
    const {batchId} = req.params;
  
    
    const response = await getBatchwiseBestStd_Usecase(dependencies).executeFunction(batchId)
    console.log(response,"response in controller");
    
    res.status(201).json(response)
    
 }
 return getBatchwiseBestStd;
}
