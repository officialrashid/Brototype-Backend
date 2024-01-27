
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {addMiscellaneousWorkoutsTask_Usecase}
    } = dependencies
    const addMiscellaneousWorkoutsTaskController = async (req: Request, res: Response) => {
        const response = await addMiscellaneousWorkoutsTask_Usecase(dependencies)(req.body); // Fix the function call
        res.status(201).json(response);
      };
      
 return addMiscellaneousWorkoutsTaskController;
}
