
import { Request, Response } from "express";



export default (dependencies: any) => {

    const {
        useCase: { getDayTimeLineup_Usecase }
    } = dependencies
    const getDayTimeLineupController = async (req: Request, res: Response) => {
        console.log();
        
       const {reviewerId,dayTimeLine} = req.query;

       
        const response = await getDayTimeLineup_Usecase(dependencies).executeFunction(reviewerId,dayTimeLine)
        console.log(response,"controller illll ethittaaa");
        
        res.status(201).json(response);
    }
    return getDayTimeLineupController;
}
