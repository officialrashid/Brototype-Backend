
import { Request, Response } from "express";

// get batch wise students controller
export default (dependencies: any) => {

    const {
        useCase: { updateStudentStatus_Usecase }
    } = dependencies
    const updateStudentStatusController = async (req: Request, res: Response) => {
        try {
            const { studentId , batch ,action } = req.body
            const response = await updateStudentStatus_Usecase(dependencies).excutefunction(studentId,batch,action)// pass the data excutefunction define in students usecase
            res.status(201).json(response)
        } catch(err){
            res.status(500).json({err:"Internal Servre Error"}) // handle exception
        }
    
    
 }
    return updateStudentStatusController;
}
