
import { Request, Response } from "express";

export default (dependencies: any) => {

    const {
        useCase: { getReviewCountAnalyze_Usecase }
    } = dependencies
    const getReviewCountAnalyzeController = async (req: Request, res: Response) => {
        const response = await getReviewCountAnalyze_Usecase(dependencies).executeFunction()
        res.status(201).json(response);
    }
    return getReviewCountAnalyzeController;
}
