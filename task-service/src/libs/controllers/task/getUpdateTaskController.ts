
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getUpdateTask_Usecase}
    } = dependencies
    const getUpdateTaskController = async (req: Request, res: Response) => {
        console.log(req.params.studentId, "backend req.body log cominggg");
        const {studentId} = req.params
        const response = await getUpdateTask_Usecase(dependencies)(studentId); // Fix the function call
        res.status(201).json(response);
      };
      
 return getUpdateTaskController;
}
