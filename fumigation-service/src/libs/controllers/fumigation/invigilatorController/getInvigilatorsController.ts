
import { Request, Response } from "express";

//get Invigilator controller 
export default (dependencies: any) => {

    const {
        useCase: { getInvigilators_Usecase }
    } = dependencies
    const getInvigilatorsController = async (req: Request, res: Response) => {
        try{
            const response = await getInvigilators_Usecase(dependencies).excutefunction() // call the usecase excute function
            res.status(201).json(response) // return response
        } catch(err){
            res.status(500).json({err:"Internal Server Error"}) // exception handling
        }
       
    }

    return getInvigilatorsController
    
}
