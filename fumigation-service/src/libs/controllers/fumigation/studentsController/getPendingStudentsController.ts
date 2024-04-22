
import { Request, Response } from "express";

// get stdent mark controller
export default (dependencies: any) => {

    const {
        useCase: { getPendingStudents_Usecase }
    } = dependencies
    const getPendingStudentsController = async (req: Request, res: Response) => {
        try{
            const {uniqueId} = req.params // destructuring data
            const response = await getPendingStudents_Usecase(dependencies).excutefunction(uniqueId)// pass the data to usecase function
            res.status(201).json(response) // return response
        } catch(err){
            res.status(500).json({err:"Internal server Error"}) // handle exception
        }
       
    }

    return getPendingStudentsController // return the function
    
}
