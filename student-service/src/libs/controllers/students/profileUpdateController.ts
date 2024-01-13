
import { Request,Response } from "express";
import {validationResult} from "express-validator"
export default (dependencies:any)=>{
    
    const {
        useCase: { profileUpdate_Usecase }
    } = dependencies
 const profileUpdateController = async (req:Request,res:Response)=>{
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     console.log("error il keri makkaleeeeeeee",errors);
    //     res.status(422).json({ errors: errors.array() });
    //     return 
    //   }
    const {file} = req
   
    const response = await profileUpdate_Usecase(dependencies).executeFunction(req.body,file)
    res.status(201).json(response)
    
 }
 return profileUpdateController;
}

