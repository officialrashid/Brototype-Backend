
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getEditTaskDetails_Usecase}
    } = dependencies
    const getEditTaskDetailsController = async (req: Request, res: Response) => {
        console.log(req.query, "backend req.body log cominggg");
        const response = await getEditTaskDetails_Usecase(dependencies)(req.query); // Fix the function call
        res.status(201).json(response);
      };
      
 return getEditTaskDetailsController;
}
