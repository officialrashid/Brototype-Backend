
import { Request, Response } from "express";

// get All Batches controller 
export default (dependencies: any) => {

    const {
        useCase: { getAllBatch_Usecase }
    } = dependencies

    const getAllBatches = async (req: Request, res: Response) => {
        try {
            const response = await getAllBatch_Usecase(dependencies).excutefunction() // call the usecase excute function
            res.status(201).json(response) // return response json format
        } catch(err){
            res.status(500).json({err:"Internal Server Error"}) // exception handling
        }
      
    }

    return getAllBatches

}
