
import { Request, Response } from "express";


export default (dependencies: any) => {

    const {
        useCase: { getInvigilators_Usecase }
    } = dependencies
    const getInvigilatorsController = async (req: Request, res: Response) => {
        const response = await getInvigilators_Usecase(dependencies).excutefunction()
        res.status(201).json(response)
    }

    return getInvigilatorsController
    
}
