
import { Request, Response } from "express";

// get All Batches controller 
export default (dependencies: any) => {

    const {
        useCase: { failedStudents_Usecase }
    } = dependencies

    const failedStudentsController = async (req: Request, res: Response) => {
        try {
            const {batchId,fumigationType} = req.query
            const response = await failedStudents_Usecase(dependencies).excutefunction(batchId,fumigationType) // call the usecase excute function
            res.status(201).json(response) // return response json format
        } catch(err){
            res.status(500).json({err:"Internal Server Error"}) // exception handling
        }
      
    }

    return failedStudentsController // return passes students controller

}
