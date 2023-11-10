
import { Request, Response } from "express";


export default (dependencies: any) => {

    const {
        useCase: { editInvigilatorSubmit_Usecase }
    } = dependencies
    const editInvigilatorSubmitController = async (req: Request, res: Response) => {
        const {invigilatorId,name,email,phone,batch} = req.body
        const response = await editInvigilatorSubmit_Usecase(dependencies).excutefunction(invigilatorId,name,email,phone,batch)
        res.status(201).json(response)
    }

    return editInvigilatorSubmitController
    
}
