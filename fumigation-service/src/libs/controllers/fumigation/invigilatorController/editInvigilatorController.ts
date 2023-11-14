
import { Request, Response } from "express";

// editInvigilator Controller
export default (dependencies: any) => {

    const {
        useCase: { editInvigilator_Usecase }
    } = dependencies
    const editInvigilatorController = async (req: Request, res: Response) => {
        try{
            const {invigilatorId} = req.body
            const response = await editInvigilator_Usecase(dependencies).excutefunction(invigilatorId)
            res.status(201).json(response)
        } catch(err){
            res.status(500).json({err:"Internal Server Error"}) // handle exception 
        }
       
    }

    return editInvigilatorController
    
}
