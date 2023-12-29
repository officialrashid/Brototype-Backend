
import { Request, Response } from "express";



export default (dependencies: any) => {

    const {
        useCase: { updateScheduleEvents_Usecase }
    } = dependencies
    const updateScheduleEventsController = async (req: Request, res: Response) => {
       
        const response = await updateScheduleEvents_Usecase(dependencies).executeFunction(req.body)
        res.status(201).json(response)



    }
    return updateScheduleEventsController;
}
