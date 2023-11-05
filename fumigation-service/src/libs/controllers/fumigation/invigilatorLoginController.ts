
import { Request, Response } from "express";


export default (dependencies: any) => {

    const {
        useCase: { invigilatorLogin_Usecase }
    } = dependencies
    const invigilatorLoginController = async (req: Request, res: Response) => {
        const {name,email} = req.body
        const response = await invigilatorLogin_Usecase (dependencies).excutefunction(name,email)
        res.status(201).json(response)

    }
    return invigilatorLoginController;
}
