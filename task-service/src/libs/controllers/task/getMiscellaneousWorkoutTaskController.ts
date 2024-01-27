
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getMiscellaneousWorkoutTask_Usecase}
    } = dependencies
    const getMiscellaneousWorkoutTaskController = async (req: Request, res: Response) => {
        console.log(req.params.week, "backend req.body log cominggg");
        const {week} = req.params
        const response = await getMiscellaneousWorkoutTask_Usecase(dependencies)(week); // Fix the function call
        res.status(201).json(response);
      };
      
 return getMiscellaneousWorkoutTaskController;
}

