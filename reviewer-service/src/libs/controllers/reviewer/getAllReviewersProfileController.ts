
import { Request, Response } from "express";
import reviewer from ".";



export default (dependencies: any) => {

    const {
        useCase: { getAllReviewersProfile_Usecase }
    } = dependencies
    const getAllReviewersProfileController = async (req: Request, res: Response) => {
        const {currentPage} = req.params
        const response = await getAllReviewersProfile_Usecase(dependencies).executeFunction(currentPage)
        res.status(201).json(response);
    }
    return getAllReviewersProfileController;
}
