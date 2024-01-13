
import { Request,Response } from "express";
import {validationResult} from "express-validator"
export default (dependencies: any) => {
    const {
        useCase: { reviewerWrokDetails_Usecase }
    } = dependencies;

    const updateWorkDetailsController = async (req: Request, res: Response) => {
        try {
            const response = await reviewerWrokDetails_Usecase(dependencies).executeFunction(req.body);
            res.status(201).json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    };

    return updateWorkDetailsController;
};


