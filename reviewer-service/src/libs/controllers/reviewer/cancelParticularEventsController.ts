
import { Request, Response } from "express";

export default (dependencies: any) => {

    const {
        useCase: { cancelParticularEvents_Usecase }
    } = dependencies
    const cancleParticularEventsController = async (req: Request, res: Response) => {
        const {reviewerId,eventId,bookedEventId,advisorId,studentId,bookStatus} = req.body
        const response = await cancelParticularEvents_Usecase(dependencies).executeFunction(reviewerId,eventId,bookedEventId,advisorId,studentId,bookStatus)
        res.status(201).json(response);
    }
    return cancleParticularEventsController;
}
