
import { Request, Response } from "express";

export default (dependencies: any) => {

    const {
        useCase: { updateParticularEvents_Usecase }
    } = dependencies
    const updateParticularEventsController = async (req: Request, res: Response) => {
        const {reviewerId,eventId,bookedEventId,advisorId,studentId,bookStatus,reviewId,cancel} = req.body
        const response = await updateParticularEvents_Usecase(dependencies).executeFunction(reviewerId,eventId,bookedEventId,advisorId,studentId,bookStatus,reviewId,cancel)
        res.status(201).json(response);
    }
    return updateParticularEventsController;
}
