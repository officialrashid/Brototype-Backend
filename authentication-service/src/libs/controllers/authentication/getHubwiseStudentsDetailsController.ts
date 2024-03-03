
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getHubwiseStudentsDetails_Usecase}
    } = dependencies
 const getHubwiseStudentsDetailsController = async (req:Request,res:Response)=>{
    const {uniqueId} = req.params
    const response = await getHubwiseStudentsDetails_Usecase(dependencies).executeFunction(uniqueId)
    res.status(201).json(response)
    
 }
 return getHubwiseStudentsDetailsController;
}
