import { Request, Response } from "express";


export default (dependencies: any) => {
    const { useCase: { updateUnreadMsgZero_Usecase } } = dependencies;

    const updateUnreadMsgZeroController = async (req: Request, res: Response) => {
        try {
            const { initiatorId,recipientId,chatId,type } = req.body
            console.log(req.body,"{}{}{{____+++++******^^^^^&&&&&");
            
            const response = await updateUnreadMsgZero_Usecase(dependencies).executeFunction(initiatorId,recipientId,chatId,type);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };

    return updateUnreadMsgZeroController;
};
