
import { Request, Response } from "express";

export default (dependencies: any) => {

    const {
        useCase: { updateParticularEvents_Usecase }
    } = dependencies
    const updateParticularEventsController = async (req: Request, res: Response) => {
        const {reviewerId,eventId,bookedEventId,bookStatus} = req.body
        const response = await updateParticularEvents_Usecase(dependencies).executeFunction(reviewerId,eventId,bookedEventId,bookStatus)
        res.status(201).json(response);
    }
    return updateParticularEventsController;
}
