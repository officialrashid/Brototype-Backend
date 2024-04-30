
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getAdvisorDetails_Usecase}
    } = dependencies
 const getAdvisorDetailsController = async (req:Request,res:Response)=>{
    const {advisorId} = req.params
    console.log(advisorId,"advisorId cominggg from advisor detailss");
    
    const response = await getAdvisorDetails_Usecase(dependencies).executeFunction(advisorId)
    res.status(201).json(response)
    
 }
 return getAdvisorDetailsController;
}
