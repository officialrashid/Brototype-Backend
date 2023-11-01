
import { Request, Response } from "express";


export default (dependencies: any) => {

    const {
        useCase: { addStudents_Usecase }
    } = dependencies
    const addStudentsController = async (req: Request, res: Response) => {
        const {studentId,batchId} = req.body
        const response = await addStudents_Usecase (dependencies).excutefunction(studentId,batchId)
        res.status(201).json(response)

    }
    return addStudentsController;
}
