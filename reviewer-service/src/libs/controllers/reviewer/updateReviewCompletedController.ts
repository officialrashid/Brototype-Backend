
import { Request, Response } from "express";

export default (dependencies: any) => {

    const {
        useCase: { updateReviewCompleted_Usecase }
    } = dependencies
    const updateReviewCompletedController = async (req: Request, res: Response) => {
        const {reviewerId,eventId,bookedEventId,status} = req.body
        const response = await updateReviewCompleted_Usecase(dependencies).executeFunction(reviewerId,eventId,bookedEventId,status)
        res.status(201).json(response);
    }
    return updateReviewCompletedController;
}
