
import { Request, Response } from "express";

// editBatch controller
export default (dependencies: any) => {

    const {
        useCase: { confirmPassedStudents_Usecase }
    } = dependencies
   
        const confirmPassedStudentsController = async (req: Request, res: Response) => {
            try{
            const {batchId,fumigationType} = req.body // destructring
            const response = await confirmPassedStudents_Usecase(dependencies).excutefunction(batchId,fumigationType) // pass the data to usecase function
            res.status(201).json(response) // return response
        }catch(err){
           res.status(500).json({err: "Intrnal Server Error"}) // exception handling
        }
 
    } 
    return confirmPassedStudentsController   
}
