import { Request, Response } from "express";


export default (dependencies: any) => {
    const { useCase: { getAllChatRecipients_Usecase } } = dependencies;

    const getAllChatRecipientsController = async (req: Request, res: Response) => {
        try {
            const { initiatorId } = req.params;
            const response = await getAllChatRecipients_Usecase(dependencies).executeFunction(initiatorId);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };

    return getAllChatRecipientsController;
};
