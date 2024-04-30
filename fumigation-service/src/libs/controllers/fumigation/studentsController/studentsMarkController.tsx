
import { Request, Response } from "express";
import fumigation from "..";


export default (dependencies: any) => {

    const {
        useCase: { studentsMark_Usecase }
    } = dependencies
    const studentsMarkController = async (req: Request, res: Response) => {
        try {
            const { studentId, batchId, invigilatorId, type, startTime, endTime, mark, fumigationType } = req.body // destructure all data
            console.log(studentId, batchId, invigilatorId, type, startTime, endTime, mark, fumigationType,"coming body yarrrrrrr");
            
            const response = await studentsMark_Usecase(dependencies).excutefunction(studentId, batchId, invigilatorId, type, startTime, endTime, mark, fumigationType) // pass all destructuring data to students usecase function

            res.status(201).json(response) // return response
        } catch (err) {
            res.status(500).json({ err: "Internal server Error" }) // handle exception
        }

    }
    return studentsMarkController;
}
