import { Request, Response } from "express";


export default (dependencies: any) => {
    const { useCase: { updateGroupUnreadMsgZero_Usecase } } = dependencies;

    const updateGroupUnreadMsgZeroController = async (req: Request, res: Response) => {
        try {
            const { groupId,senderId,type } = req.body
            const response = await updateGroupUnreadMsgZero_Usecase(dependencies).executeFunction(groupId,senderId,type);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };

    return updateGroupUnreadMsgZeroController;
};
