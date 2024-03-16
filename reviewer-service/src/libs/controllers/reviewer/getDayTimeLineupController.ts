
import { Request, Response } from "express";



export default (dependencies: any) => {

    const {
        useCase: { getDayTimeLineup_Usecase }
    } = dependencies
    const getDayTimeLineupController = async (req: Request, res: Response) => {
        console.log();
        
       const {reviewerId,dayTimeLine} = req.query;

       
        const response = await getDayTimeLineup_Usecase(dependencies).executeFunction(reviewerId,dayTimeLine)
       console.log(response,"respone in controller get time line usecasee");
       
        res.status(201).json(response);
    }
    return getDayTimeLineupController;
}
