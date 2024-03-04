
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getSuperleadHub_Usecase}
    } = dependencies
 const getSuperleadHubController = async (req:Request,res:Response)=>{
    const {uniqueId} = req.params
    console.log(uniqueId,"uniqueId coming hereeeee");
    
    const response = await getSuperleadHub_Usecase(dependencies).executeFunction(uniqueId)
    res.status(201).json(response)
    
 }
 return getSuperleadHubController;
}
