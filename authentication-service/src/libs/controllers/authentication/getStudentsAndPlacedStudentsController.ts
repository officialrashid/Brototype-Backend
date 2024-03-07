
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getStudentsAndPlacedStudents_Usecase}
    } = dependencies
 const getStudentsAndPlacedStudentsController = async (req:Request,res:Response)=>{
    const {uniqueId} = req?.params
    const response = await getStudentsAndPlacedStudents_Usecase(dependencies).executeFunction(uniqueId)
    res.status(201).json(response)
    
 }
 return getStudentsAndPlacedStudentsController;
}
