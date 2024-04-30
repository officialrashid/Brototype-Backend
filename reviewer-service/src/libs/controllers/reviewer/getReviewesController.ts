
import { Request, Response } from "express";
import reviewer from ".";



export default (dependencies: any) => {

    const {
        useCase: { getReviewes_Usecase }
    } = dependencies
    const getReviewesController = async (req: Request, res: Response) => {
        const {reviewerId} = req.params
        console.log(reviewerId,"<><<><<<><");
        
        const response = await getReviewes_Usecase(dependencies).executeFunction(reviewerId)
        res.status(201).json(response);
    }
    return getReviewesController;
}
