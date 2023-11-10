
import { Request, Response } from "express";


export default (dependencies: any) => {

    const {
        useCase: { getAllBatch_Usecase }
    } = dependencies
    const getAllBatches = async (req: Request, res: Response) => {
        const response = await getAllBatch_Usecase(dependencies).excutefunction()
        res.status(201).json(response)
    }

    return getAllBatches
    
}
