// Express Controller
import { Request, Response } from "express";
import { weeklyPerformanceValidationRules } from "../../../input-validation/weeklyPerformanceValidation";
import { validationResult } from "express-validator";

export default (dependencies: any) => {
  const {
    useCase: { getWeeklyPerformance_Usecase }
  } = dependencies;

  const getWeeklyPerformanceController = async (req: Request, res: Response) => {
    try {
      const { batchId, studentId, selectWeek } = req.query;
      console.log(batchId, studentId, selectWeek, "llllllllllll");

      await Promise.all(weeklyPerformanceValidationRules.map((rule) => rule.run(req)));
  
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const response = await getWeeklyPerformance_Usecase(dependencies).executeFunction(studentId,batchId,selectWeek,);

      console.log(response, "response in controller");
      res.status(201).json(response);
    } catch (error) {
      console.error("Error in controller:", error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  }

  return getWeeklyPerformanceController;
}
