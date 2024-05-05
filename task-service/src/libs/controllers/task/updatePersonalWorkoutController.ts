
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {updatePersonalWorkout_Usecase}
    } = dependencies
    const updatePersonalWorkoutController = async (req: Request, res: Response) => {
        console.log(req.body, "backend req.body log cominggg taskeeeeeeee");
        const response = await updatePersonalWorkout_Usecase(dependencies)(req.body); // Fix the function call
        res.status(201).json(response);
      };
      
 return updatePersonalWorkoutController;
}
