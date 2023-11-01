
import { Request, Response } from "express";


export default (dependencies: any) => {

    const {
        useCase: { createBatch_Usecase }
    } = dependencies
    const createBatch = async (req: Request, res: Response) => {
        const {batchName,hubLocation} = req.body
        const response = await createBatch_Usecase(dependencies).excutefunction(batchName,hubLocation)
        res.status(201).json(response)

    }
    return createBatch;
}
