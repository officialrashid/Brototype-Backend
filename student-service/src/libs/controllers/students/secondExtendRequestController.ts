import { Request, Response } from "express";

export default (dependencies: any) => {
    const {
        useCase: { secondExtendRequest_Usecase }
    } = dependencies;

    const secondExtendRequestController = async (req: Request, res: Response) => {
        const { extendId } = req.params; // Destructuring to get the body propert
        if(!extendId){
            res.status(400).json({messsage:"your extend details not found"})
        }
        const response = await secondExtendRequest_Usecase(dependencies).executeFunction(extendId);
        if (response) {
            res.status(201).json(response);
        }
    };

    return secondExtendRequestController;
};
