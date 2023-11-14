
import { Request, Response } from "express";

// edit Invigilator Submit Controller
export default (dependencies: any) => {

    const {
        useCase: { editInvigilatorSubmit_Usecase }
    } = dependencies
    const editInvigilatorSubmitController = async (req: Request, res: Response) => {
        try {
            const { invigilatorId, name, email, phone, batch } = req.body // req.body all destructuring data 
            const response = await editInvigilatorSubmit_Usecase(dependencies).excutefunction(invigilatorId, name, email, phone, batch)
            res.status(201).json(response) // return response
        } catch (err) {
            res.status(500).json({ err: "Internal Server Error" }) // handle exception
        }

    }

    return editInvigilatorSubmitController

}
