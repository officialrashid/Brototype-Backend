
import { Request, Response } from "express";
import { requestExtentionValidationRules } from "../../../input-validation/requestExtentionValidation";
import { validationResult } from "express-validator";

export default (dependencies: any) => {
    const {
        useCase: { requestExtention_Usecase }
    } = dependencies
    const requestExtentionController = async (req: Request, res: Response) => {
        await Promise.all(requestExtentionValidationRules.map((rule) => rule.run(req)));

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const response = await requestExtention_Usecase(dependencies).executeFunction(req.body)
        if (response) {
            res.status(201).json(response)
        }
    }
    return requestExtentionController;
}
