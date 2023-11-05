import { Request,Response } from "express";

export  default (dependencies: any) => {
    
    const {
        useCase: { createInvigilator_Usecase }
    } = dependencies;

    const createInvigilatorController = async (req: Request, res: Response) => {
        console.log(req.body,"lllll");
        
        const response = await createInvigilator_Usecase(dependencies).executeFunction(req.body);
        res.status(201).json(response);
    }

    return createInvigilatorController;
}