
import { Request, Response } from "express";


export default (dependencies: any) => {

    const {
        useCase: { editBatch_Usecase }
    } = dependencies
    const editBatch = async (req: Request, res: Response) => {
        const {batchId} = req.body
        const response = await editBatch_Usecase(dependencies).excutefunction(batchId)
        res.status(201).json(response)
    }

    return editBatch
    
}
