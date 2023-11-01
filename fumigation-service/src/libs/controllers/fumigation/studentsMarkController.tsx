
import { Request, Response } from "express";


export default (dependencies: any) => {

    const {
        useCase: { studentsMark_Usecase }
    } = dependencies
    const studentsMarkController = async (req: Request, res: Response) => {
        const {type,startTime,endTime} = req.body
        
        const response = await  studentsMark_Usecase(dependencies).excutefunction(type,startTime,endTime)
        res.status(201).json(response)
 
    }
    return studentsMarkController;
}
