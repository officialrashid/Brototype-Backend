
import { Request, Response } from "express";
import fumigation from ".";


export default (dependencies: any) => {

    const {
        useCase: { studentsMark_Usecase }
    } = dependencies
    const studentsMarkController = async (req: Request, res: Response) => {
        const {studentId,batchId,invigilatorId,type,startTime,endTime,mark,fumigationType} = req.body
          console.log(req.body);
          
        const response = await  studentsMark_Usecase(dependencies).excutefunction(studentId,batchId,invigilatorId,type,startTime,endTime,mark,fumigationType)
        console.log(response,"xbvxfd");
        
        res.status(201).json(response)
 
    }
    return studentsMarkController;
}
