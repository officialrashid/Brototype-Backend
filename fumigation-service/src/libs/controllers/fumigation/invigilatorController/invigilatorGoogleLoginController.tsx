
import { Request, Response } from "express";


export default (dependencies: any) => {

    const {
        useCase: { invigilatorGoogleLogin_Usecase }
    } = dependencies
    const invigilatorGoogleLoginController = async (req: Request, res: Response) => {
        try{
            const obj = req.body
            const email = Object.keys(obj)[0];
            const response = await invigilatorGoogleLogin_Usecase(dependencies).excutefunction(email)
            res.status(201).json(response) // return response
        } catch(err){
            res.status(500).json({err:"Internal server Error"}) // return the error
        }
       

    }
    return invigilatorGoogleLoginController;
}
