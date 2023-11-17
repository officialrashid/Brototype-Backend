
import { Request, Response } from "express";

// create Batch controller 
export default (dependencies: any) => {

    const {
        useCase: { createBatch_Usecase }
    } = dependencies
    const createBatch = async (req: Request, res: Response) => {
        try{
            const {batchName,hubLocation} = req.body
            
            const response = await createBatch_Usecase(dependencies).excutefunction(batchName,hubLocation) //send the data in usecase excutefunction
            res.status(201).json(response) // return response
        } catch(err){
            res.status(500).json({err: "Intrnal Server Error"}) //  exception handling //
        }
    }
 
    return createBatch
    
}
