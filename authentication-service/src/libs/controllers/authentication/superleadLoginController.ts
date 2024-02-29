
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {superleadLogin_Usecase}
    } = dependencies
 const superleadLoginController = async (req:Request,res:Response)=>{
    const {uniqueId} = req.body
    
    const response = await superleadLogin_Usecase(dependencies).executeFunction(uniqueId)
    console.log(response,"[][][]]");
    res.status(201).json(response)
    
 }
 return superleadLoginController;
}
