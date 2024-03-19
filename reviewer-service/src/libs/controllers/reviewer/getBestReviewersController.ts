
import { Request, Response } from "express";

export default (dependencies: any) => {

    const {
        useCase: { getBestReviewers_Usecase }
    } = dependencies
    const getBestReviewersController = async (req: Request, res: Response) => {
        console.log("get best reviewrs get not see that");
        
        const response = await getBestReviewers_Usecase(dependencies).executeFunction()
        res.status(201).json(response);
    }
    return getBestReviewersController;
}
