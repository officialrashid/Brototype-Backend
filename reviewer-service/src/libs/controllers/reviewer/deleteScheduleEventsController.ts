
import { Request, Response } from "express";



export default (dependencies: any) => {

    const {
        useCase: { deleteScheduleEvents_Usecase }
    } = dependencies
    const deleteScheduleEventsController = async (req: Request, res: Response) => {
        const response = await deleteScheduleEvents_Usecase(dependencies).executeFunction(req.query)
        res.status(201).json(response)



    }
    return deleteScheduleEventsController;
}
