
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {addPersonalWorkoutsTask_Usecase}
    } = dependencies
    const addPersonalWorkoutsTaskController = async (req: Request, res: Response) => {
        console.log(req.body, "backend req.body log cominggg");
        const response = await addPersonalWorkoutsTask_Usecase(dependencies)(req.body); // Fix the function call
        res.status(201).json(response);
      };
      
 return addPersonalWorkoutsTaskController;
}
