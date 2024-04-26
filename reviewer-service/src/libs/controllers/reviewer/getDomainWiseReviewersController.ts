
import { Request, Response } from "express";

export default (dependencies: any) => {

    const {
        useCase: { getDomainWiseReviewers_Usecase }
    } = dependencies
    const getDomainWiseReviewersController= async (req: Request, res: Response) => {
        const {domain} = req.params
        console.log(domain,"lllllllllllll(*******&&&&&");
        
        const response = await getDomainWiseReviewers_Usecase(dependencies).executeFunction(domain)
        res.status(201).json(response);
    }
    return getDomainWiseReviewersController;
}
