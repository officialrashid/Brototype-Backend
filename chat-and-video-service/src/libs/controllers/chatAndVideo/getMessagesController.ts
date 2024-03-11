import { Request, Response } from "express";


export default (dependencies: any) => {
    const { useCase: { getMessages_Usecase } } = dependencies;

    const getMessagesController = async (req: Request, res: Response) => {
        try {
            const { initiatorId, recipientId } = req.query;
            console.log(initiatorId);
            console.log(recipientId);
            const response = await getMessages_Usecase(dependencies).executeFunction(initiatorId,recipientId);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };

    return getMessagesController;
};
