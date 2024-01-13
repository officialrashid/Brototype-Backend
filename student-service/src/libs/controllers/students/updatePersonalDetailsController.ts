
import { Request,Response } from "express";
import {validationResult} from "express-validator"
import { personalDetailsValidationRules } from "../../../input-validation/personalDetailsValidation";
export default (dependencies:any)=>{
    
    const {
        useCase: { personalDetails_Usecase }
    } = dependencies
 const updatePersonalDetailsController = async (req:Request,res:Response)=>{

    // await Promise.all(personalDetailsValidationRules.map((rule) => rule.run(req)));

    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
   
   
    const response = await personalDetails_Usecase(dependencies).executeFunction(req.body)
    res.status(201).json(response)
    
 }
 return updatePersonalDetailsController;
}

