
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getWeekTask_Usecase}
    } = dependencies
    const getWeekTaskController = async (req: Request, res: Response) => {
        const {studentId,weekName} = req.query
        const response = await getWeekTask_Usecase(dependencies)(studentId,weekName); // Fix the function call
        res.status(201).json(response);
      };
      
 return getWeekTaskController;
}
