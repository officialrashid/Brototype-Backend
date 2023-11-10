
import { Request, Response } from "express";


export default (dependencies: any) => {

    const {
        useCase: { editInvigilator_Usecase }
    } = dependencies
    const editInvigilatorController = async (req: Request, res: Response) => {
        const {invigilatorId} = req.body
        const response = await editInvigilator_Usecase(dependencies).excutefunction(invigilatorId)
        res.status(201).json(response)
    }

    return editInvigilatorController
    
}
