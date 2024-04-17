
import { Request, Response } from "express";

export default (dependencies: any) => {

    const {
        useCase: { getParticularEvents_Usecase }
    } = dependencies
    const getParticularEventsController = async (req: Request, res: Response) => {
        const {reviewerId} = req.params
        console.log(reviewerId,"hbhjhbhh78yt776t7");
        
        const response = await getParticularEvents_Usecase(dependencies).executeFunction(reviewerId)
        res.status(201).json(response);
    }
    return getParticularEventsController;
}
