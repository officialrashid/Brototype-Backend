
import { Request,Response } from "express";
import { courseCompletionValidationRules } from "../../../input-validation/courseCompletionValidation";
import { validationResult } from "express-validator";

export default (dependencies:any)=>{
    const {
        useCase: { getCourseCompletion_Usecase }
    } = dependencies
 const getCourseCompletionController = async (req:Request,res:Response)=>{
    const {  studentId ,batchId } = req.query;
  
    console.log(studentId,batchId,"batchId coming to course completion grap");
    await Promise.all(courseCompletionValidationRules.map((rule) => rule.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const response = await getCourseCompletion_Usecase(dependencies).executeFunction(studentId,batchId)
    console.log(response,"response in controller");
    
    res.status(201).json(response)
    
 }
 return getCourseCompletionController;
}
