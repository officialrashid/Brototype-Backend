
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {addTechnicalWorkoutsTask_Usecase}
    } = dependencies
    const addTechnicalWorkoutsTaskController = async (req: Request, res: Response) => {
        const response = await addTechnicalWorkoutsTask_Usecase(dependencies)(req.body); // Fix the function call
        res.status(201).json(response);
      };
      
 return addTechnicalWorkoutsTaskController;
}
