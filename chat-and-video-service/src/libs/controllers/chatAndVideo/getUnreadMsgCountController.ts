import { Request, Response } from "express";


export default (dependencies: any) => {
    const { useCase: { getMessages_Usecase } } = dependencies;

    const getUserUnreadMsgCountController = async (req: Request, res: Response) => {
        try {
            const { initiatorId } = req.params;
            const response = await getMessages_Usecase(dependencies).executeFunction(initiatorId);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };

    return getUserUnreadMsgCountController;
};
