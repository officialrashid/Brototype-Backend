
import { Request,Response } from "express";
import { courseCompletionValidationRules } from "../../../input-validation/courseCompletionValidation";
import { validationResult } from "express-validator";

export default (dependencies:any)=>{
    const {
        useCase: { getExtendDetails_Usecase }
    } = dependencies
 const getExtendDetailsController = async (req:Request,res:Response)=>{
    const { batchId, studentId  } = req.query;
  
    console.log(studentId,"batchId coming to course completion grap");
    console.log(studentId,batchId,"batchId coming to course completion grap");
    await Promise.all(courseCompletionValidationRules.map((rule) => rule.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const response = await getExtendDetails_Usecase(dependencies).executeFunction(batchId,studentId)
     if(response){
        res.status(201).json(response)
     }  
 }
 return getExtendDetailsController;
}
