
import { Request, Response } from "express";
import reviewer from ".";



export default (dependencies: any) => {

    const {
        useCase: { getAllDetails_Usecase }
    } = dependencies
    const getAllDetailsController = async (req: Request, res: Response) => {
       const {reviewerId} = req.params
        const response = await getAllDetails_Usecase(dependencies).executeFunction(reviewerId)
        res.status(201).json(response);
    }
    return getAllDetailsController;
}
