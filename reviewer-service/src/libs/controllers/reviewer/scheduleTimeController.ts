
import { Request, Response } from "express";


export default (dependencies: any) => {

    const {
        useCase: { scheduleTime_Usecase }
    } = dependencies
    const scheduleTimeController = async (req: Request, res: Response) => {
        const response = await scheduleTime_Usecase(dependencies).executeFunction(req.body)

        res.status(201).json(response)



    }
    return scheduleTimeController;
}
