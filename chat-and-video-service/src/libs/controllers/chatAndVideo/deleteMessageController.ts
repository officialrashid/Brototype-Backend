import { Request, Response } from "express";


export default (dependencies: any) => {
    const { useCase: { deleteMessage_Usecase } } = dependencies;

    const deleteMessageController = async (req: Request, res: Response) => {
        try {
            const { messageId,action } = req.query;
            const response = await deleteMessage_Usecase(dependencies).executeFunction(messageId,action);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };

    return deleteMessageController;
};
