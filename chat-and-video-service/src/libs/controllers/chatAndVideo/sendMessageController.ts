import { Request, Response } from "express";


export default (dependencies: any) => {
    const { useCase: { sendMessage_Usecase } } = dependencies;

    const sendMessageController = async (req: Request, res: Response) => {
        try {
   
            
            const { senderId, receiverId, content, type } = req.body;
     
            
            const response = await sendMessage_Usecase(dependencies).executeFunction(senderId, receiverId, content,type);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };

    return sendMessageController;
};
