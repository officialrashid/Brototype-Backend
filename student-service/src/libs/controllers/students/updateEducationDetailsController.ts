
import { Request,Response } from "express";
import {validationResult} from "express-validator"
import { educationDetailsValidationRules } from "../../../input-validation/educationDetailsValidation";
export default (dependencies:any)=>{
    
    const {
        useCase: { educationDetails_Usecase }
    } = dependencies
 const updateEducationDetailsController = async (req:Request,res:Response)=>{

    // await Promise.all(educationDetailsValidationRules.map((rule) => rule.run(req)));

    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
   
    const response = await educationDetails_Usecase(dependencies).executeFunction(req.body)
    res.status(201).json(response)
    
 }
 return updateEducationDetailsController;
}

