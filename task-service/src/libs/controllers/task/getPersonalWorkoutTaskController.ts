
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getPersonalWorkoutTask_Usecase}
    } = dependencies
    const getPersonalWorkoutTaskController = async (req: Request, res: Response) => {
        console.log(req.params.week, "backend req.body log cominggg");
        const {week} = req.params
        const response = await getPersonalWorkoutTask_Usecase(dependencies)(week); // Fix the function call
        res.status(201).json(response);
      };
      
 return getPersonalWorkoutTaskController;
}
