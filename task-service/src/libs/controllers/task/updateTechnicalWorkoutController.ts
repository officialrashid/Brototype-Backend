
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {updateTechnicalWorkout_Usecase}
    } = dependencies
    const updateTechnicalWorkoutController = async (req: Request, res: Response) => {
        console.log(req.body, "backend req.body log cominggg");
        const response = await updateTechnicalWorkout_Usecase(dependencies)(req.body); // Fix the function call
        res.status(201).json(response);
      };
      
 return updateTechnicalWorkoutController;
}
