import { Request, Response } from "express";


export default (dependencies: any) => {
    const { useCase: { createChat_Usecase } } = dependencies;

    const createChatController = async (req: Request, res: Response) => {
        try {
         
            
            const { initiatorId, recipientId,chaters } = req.body;

            console.log(req.body,"llllllllllllllll");
            
            const response = await createChat_Usecase(dependencies).executeFunction(initiatorId, recipientId,chaters);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };

    return createChatController;
};
