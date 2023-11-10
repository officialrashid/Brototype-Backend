
import { Request, Response } from "express";


export default (dependencies: any) => {

    const {
        useCase: { editBatchSubmit_Usecase }
    } = dependencies
    const editBatchSubmitController = async (req: Request, res: Response) => {
        const {batchId,batchName} = req.body
        const response = await editBatchSubmit_Usecase(dependencies).excutefunction(batchId,batchName)
        res.status(201).json(response)
    }

    return editBatchSubmitController
    
}
