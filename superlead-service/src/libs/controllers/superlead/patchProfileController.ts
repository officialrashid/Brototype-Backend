
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {patchProfile_Usecase}
    } = dependencies
 const patchProfileController = async (req:Request,res:Response)=>{
    console.log(req.body,"sbsdbndfvsnbfsvfsnfvsbnfbsnfsnfs0000000000");
    
     const {file} = req
    const response = await patchProfile_Usecase(dependencies).executeFunction(req.body,file)
    res.status(201).json(response)
    
 }
 return patchProfileController;
}
