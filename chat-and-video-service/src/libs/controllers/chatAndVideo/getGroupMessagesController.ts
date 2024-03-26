import { Request, Response } from "express";


export default (dependencies: any) => {
    const { useCase: { getGroupMessages_Usecase } } = dependencies;

    const getGroupMessagesController = async (req: Request, res: Response) => {
        try {
            const { groupId, senderId } = req.query;
            console.log(groupId,"groupId");
            console.log(senderId,"senderId");
            const response = await getGroupMessages_Usecase(dependencies).executeFunction(groupId,senderId);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };

    return getGroupMessagesController;
};
