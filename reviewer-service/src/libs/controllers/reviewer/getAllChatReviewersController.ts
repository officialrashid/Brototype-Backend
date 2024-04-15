
import { Request, Response } from "express";



export default (dependencies: any) => {

    const {
        useCase: { getAllChatReviewers_Usecase }
    } = dependencies
    const getAllChatReviewersController = async (req: Request, res: Response) => {
        const response = await getAllChatReviewers_Usecase(dependencies).executeFunction()
        res.status(201).json(response)



    }
    return getAllChatReviewersController;
}
