
import { Request, Response } from "express";



export default (dependencies: any) => {

    const {
        useCase: { getScheduleEvents_Usecase }
    } = dependencies
    const getScheduleEventsController = async (req: Request, res: Response) => {
       const {reviewerId} = req.params;
        const response = await getScheduleEvents_Usecase(dependencies).executeFunction(reviewerId)
        res.status(201).json(response)



    }
    return getScheduleEventsController;
}
