
import { Request,Response } from "express";
import {validationResult} from "express-validator"
export default (dependencies:any)=>{
    
    const {
        useCase: { educationDetails_Usecase }
    } = dependencies
 const updateEducationDetailsController = async (req:Request,res:Response)=>{
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
        // console.log("error il keri makkaleeeeeeee",errors);
        // res.status(422).json({ errors: errors.array() });
        // return 
    //   }
   
    const response = await educationDetails_Usecase(dependencies).executeFunction(req.body)
    res.status(201).json(response)
    
 }
 return updateEducationDetailsController;
}

