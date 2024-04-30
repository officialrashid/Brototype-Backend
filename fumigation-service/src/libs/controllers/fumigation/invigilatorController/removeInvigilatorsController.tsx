
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: { removeInvigilator_Usecase}
    } = dependencies
 const removeInvigilatorsController = async (req:Request,res:Response)=>{
     try{
        const {invigilatorId} = req.params 
        console.log(invigilatorId,"invigilatorIDssssss");
        
        const response = await  removeInvigilator_Usecase(dependencies).excutefunction(invigilatorId) // pass the data to usecase
        res.status(201).json(response) // return response
     } catch(err){
        res.status(500).json({err:"Internal Server Error"}) // pass the exception
     }
    
    
 }
 return removeInvigilatorsController;
}
