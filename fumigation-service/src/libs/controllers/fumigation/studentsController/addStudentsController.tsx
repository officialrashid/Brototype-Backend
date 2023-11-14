
import { Request, Response } from "express";

// add Students Controller ///
export default (dependencies: any) => {

    const {
        useCase: { addStudents_Usecase }
    } = dependencies
    const addStudentsController = async (req: Request, res: Response) => {
        try{
            const {studentId,batchId} = req.body // desturcturing data
            const response = await addStudents_Usecase (dependencies).excutefunction(studentId,batchId) // pass the data to usecase function
            res.status(201).json(response) // return response
        } catch(err){
            res.status(500).json({err:"Internal Server Error"})
        }
       

    }
    return addStudentsController;
}
// end this controller