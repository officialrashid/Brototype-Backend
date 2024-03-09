
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getAllReviewersStatus_Usecase}
    } = dependencies
 const getPerPageStudentStatusController = async (req:Request,res:Response)=>{
    const response = await getAllReviewersStatus_Usecase(dependencies).executeFunction()
    res.status(201).json(response)
    
 }
 return getPerPageStudentStatusController;
}
