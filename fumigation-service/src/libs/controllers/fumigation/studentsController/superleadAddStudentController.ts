
import { Request, Response } from "express";

// add Students Controller ///
export default (dependencies: any) => {

    const {
        useCase: { superleadAddStudent_Usecase }
    } = dependencies
    const superleadAddStudentController = async (req: Request, res: Response) => {
        try{
            const response = await superleadAddStudent_Usecase (dependencies).excutefunction(req.body) // pass the data to usecase function
            res.status(201).json(response) // return response
        } catch(err){
            res.status(500).json({err:"Internal Server Error"})
        }
       

    }
    return superleadAddStudentController;
}
// end this controller