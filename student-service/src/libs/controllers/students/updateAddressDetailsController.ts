
import { Request,Response } from "express";
import {validationResult} from "express-validator"
import { addressDetailsValidationRules } from "../../../input-validation/addressDetailsValidation";
export default (dependencies:any)=>{
    
    const {
        useCase: { addressDetails_Usecase }
    } = dependencies
 const updateAddressDetailsController = async (req:Request,res:Response)=>{
   
  
        // await Promise.all(addressDetailsValidationRules.map((rule) => rule.run(req)));

        // const errors = validationResult(req);

        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
    const response = await addressDetails_Usecase(dependencies).executeFunction(req.body)
    res.status(201).json(response)
    
 }
 return updateAddressDetailsController;
}

