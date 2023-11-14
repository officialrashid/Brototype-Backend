
import { Request, Response } from "express";

// editBatchSubmit controller 
export default (dependencies: any) => {

    const {
        useCase: { editBatchSubmit_Usecase } // dependencie define usecase function
    } = dependencies
    const editBatchSubmitController = async (req: Request, res: Response) => {
        try{
            const {batchId,batchName} = req.body
            const response = await editBatchSubmit_Usecase(dependencies).excutefunction(batchId,batchName)
            res.status(201).json(response)
        } catch(err){
            res.status(500).json({err: "Intrnal Server Error"}) // exception handling
        }
        
    }

    return editBatchSubmitController
    
}
