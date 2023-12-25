
import { Request,Response } from "express";
import {validationResult} from "express-validator"
export default (dependencies:any)=>{
    
    const {
        useCase: { personalDetails_Usecase }
    } = dependencies
 const updatePersonalDetailsController = async (req:Request,res:Response)=>{
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
        // console.log("error il keri makkaleeeeeeee",errors);
        // res.status(422).json({ errors: errors.array() });
        // return 
    //   }
   
    const response = await personalDetails_Usecase(dependencies).executeFunction(req.body)
    res.status(201).json(response)
    
 }
 return updatePersonalDetailsController;
}

