
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getActivityTimeLineup_Usecase}
    } = dependencies
 const getActivityTimeLineupController = async (req:Request,res:Response)=>{
    const {superleadId} = req.params
    const response = await getActivityTimeLineup_Usecase(dependencies).executeFunction(superleadId)
    res.status(201).json(response)
    
 }
 return getActivityTimeLineupController;
}
