
import { Request, Response } from "express";

// editBatch controller
export default (dependencies: any) => {

    const {
        useCase: { editStudentMark_Usecase }
    } = dependencies
   
        const editStudentMarkController = async (req: Request, res: Response) => {
            try{
            const {studentId,batchId,fumigationType} = req.body // destructring
            const response = await editStudentMark_Usecase(dependencies).excutefunction(studentId,batchId,fumigationType) // pass the data to usecase function
            res.status(201).json(response) // return response
        }catch(err){
           res.status(500).json({err: "Intrnal Server Error"}) // exception handling
        }
 
    } 
    return editStudentMarkController   
}
