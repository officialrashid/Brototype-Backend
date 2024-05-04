
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getWeekTask_Usecase}
    } = dependencies
    const getWeekTaskController = async (req: Request, res: Response) => {
        const {studentId,weekName,domain} = req.query
        const response = await getWeekTask_Usecase(dependencies)(studentId,weekName,domain); // Fix the function call
        res.status(201).json(response);
      };
      
 return getWeekTaskController;
}
