
import { Request, Response } from "express";

// get All Batches controller 
export default (dependencies: any) => {

    const {
        useCase: { passedStudents_Usecase }
    } = dependencies

    const passedStudentsController = async (req: Request, res: Response) => {
        try {
            const {batchId,fumigationType} = req.query
            console.log("log passed students debugging statgeee",batchId,fumigationType);
            
            const response = await passedStudents_Usecase(dependencies).excutefunction(batchId,fumigationType) // call the usecase excute function
            res.status(201).json(response) // return response json format
        } catch(err){
            res.status(500).json({err:"Internal Server Error"}) // exception handling
        }
      
    }

    return passedStudentsController // return passes students controller

}
