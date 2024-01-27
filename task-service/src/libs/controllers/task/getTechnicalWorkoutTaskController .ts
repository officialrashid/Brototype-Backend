
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getTechnicalWorkoutTask_Usecase}
    } = dependencies
    const getTechnicalWorkoutTaskController = async (req: Request, res: Response) => {
        const {domain,weekName} = req.query
        const response = await getTechnicalWorkoutTask_Usecase(dependencies)(domain,weekName); // Fix the function call
        res.status(201).json(response);
      };
      
 return getTechnicalWorkoutTaskController;
}
