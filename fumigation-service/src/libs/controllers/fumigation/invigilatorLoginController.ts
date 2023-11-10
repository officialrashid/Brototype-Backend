
import { Request, Response } from "express";


export default (dependencies: any) => {

    const {
        useCase: { invigilatorLogin_Usecase }
    } = dependencies
    const invigilatorLoginController = async (req: Request, res: Response) => {
        const {uniqueId} = req.body
        const response = await invigilatorLogin_Usecase (dependencies).excutefunction(uniqueId)
        res.status(201).json(response)

    }
    return invigilatorLoginController;
}
