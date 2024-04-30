
import { Request, Response } from "express";

// get stdent mark controller
export default (dependencies: any) => {

    const {
        useCase: { getStudentsMark_Usecase }
    } = dependencies
    const getStudentsMarkController = async (req: Request, res: Response) => {
        try{
            const {studentId,batchId,fumigationType} = req.query // destructuring data
            console.log(studentId,batchId,fumigationType,"<><>,0000.");
            
            const response = await getStudentsMark_Usecase(dependencies).excutefunction(studentId,batchId,fumigationType)// pass the data to usecase function
            res.status(201).json(response) // return response
        } catch(err){
            res.status(500).json({err:"Internal server Error"}) // handle exception
        }
       
    }

    return getStudentsMarkController // return the function
    
}
