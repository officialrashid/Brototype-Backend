
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {updateMiscellaneousWorkout_Usecase}
    } = dependencies
    const updateMiscellaneousWorkoutController = async (req: Request, res: Response) => {
        console.log(req.body, "backend req.body log cominggg");
        const response = await updateMiscellaneousWorkout_Usecase(dependencies)(req.body); // Fix the function call
        res.status(201).json(response);
      };
      
 return updateMiscellaneousWorkoutController;
}
