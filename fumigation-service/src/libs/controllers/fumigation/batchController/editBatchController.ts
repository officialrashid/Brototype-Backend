
import { Request, Response } from "express";

// editBatch controller
export default (dependencies: any) => {

    const {
        useCase: { editBatch_Usecase }
    } = dependencies
   
        const editBatch = async (req: Request, res: Response) => {
            try{
            const {batchId} = req.params // destructring
            const response = await editBatch_Usecase(dependencies).excutefunction(batchId) // pass the data to usecase function
            res.status(201).json(response) // return response
        }catch(err){
           res.status(500).json({err: "Intrnal Server Error"}) // exception handling
        }
 
    } 
    return editBatch   
}
