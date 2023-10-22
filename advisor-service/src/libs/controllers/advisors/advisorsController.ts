
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {advisor_Usecase}
    } = dependencies
 const advisorController = async (req:Request,res:Response)=>{
    const response = await advisor_Usecase(dependencies).excutefunction(req.body)
    console.log(response,"[][][]]");
    res.json(response)
    
 }
 return advisorController;
}
