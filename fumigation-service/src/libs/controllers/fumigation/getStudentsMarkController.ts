
import { Request, Response } from "express";


export default (dependencies: any) => {

    const {
        useCase: { getStudentsMark_Usecase }
    } = dependencies
    const getStudentsMarkController = async (req: Request, res: Response) => {
        const {studentId,batchId,fumigationType} = req.body
        console.log("fgfdbgfjhbdfjgjdfgdgj");
        
        const response = await getStudentsMark_Usecase(dependencies).excutefunction(studentId,batchId,fumigationType)
        res.status(201).json(response)
    }

    return getStudentsMarkController
    
}
