
import { Request, Response } from "express";
import reviewer from ".";



export default (dependencies: any) => {

    const {
        useCase: { getPerPageReviewers_Usecase }
    } = dependencies
    const getPerPageReviewersController = async (req: Request, res: Response) => {
       const {perPage} = req.params
        const response = await getPerPageReviewers_Usecase(dependencies).executeFunction(perPage)
        res.status(201).json(response);
    }
    return getPerPageReviewersController;
}
