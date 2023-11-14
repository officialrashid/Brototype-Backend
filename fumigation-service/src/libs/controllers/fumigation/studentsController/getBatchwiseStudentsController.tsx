
import { Request, Response } from "express";

// get batch wise students controller
export default (dependencies: any) => {

    const {
        useCase: { getBatchwiseStudents_Usecase }
    } = dependencies
    const getBatchwiseStudentsController = async (req: Request, res: Response) => {
        try {
            const { batchId } = req.body
            const response = await getBatchwiseStudents_Usecase(dependencies).excutefunction(batchId)// pass the data excutefunction define in students usecase
            res.status(201).json(response)
        } catch(err){
            res.status(500).json({err:"Internal Servre Error"}) // handle exception
        }
    
    
 }
    return getBatchwiseStudentsController;
}
