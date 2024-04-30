
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getStdDashboardDetails_Usecase}
    } = dependencies
 const getStdDashboardDetailsController = async (req:Request,res:Response)=>{
    const {studentId} = req?.params
    const response = await getStdDashboardDetails_Usecase(dependencies).executeFunction(studentId)
    res.status(201).json(response)
    
 }
 return getStdDashboardDetailsController;
}
