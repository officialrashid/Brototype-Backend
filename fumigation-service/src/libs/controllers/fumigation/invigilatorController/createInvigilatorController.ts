import { Request,Response } from "express";
// createInvigilator Controller
export  default (dependencies: any) => {
    
    const {
        useCase: { createInvigilator_Usecase }
    } = dependencies;

    const createInvigilatorController = async (req: Request, res: Response) => {
      try{
        console.log(req.body,"create invigilator contrllerrrr");
        
        const response = await createInvigilator_Usecase(dependencies).executeFunction(req.body); // pass the data to usecase excute function
        res.status(201).json(response); // return response
      } catch(err){
        res.status(500).json({err:"Internal Server Error"}) // handle exception
      }
       
    }

    return createInvigilatorController;
}