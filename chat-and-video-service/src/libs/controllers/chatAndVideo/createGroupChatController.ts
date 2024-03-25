import { Request, Response } from "express";


export default (dependencies: any) => {
    const { useCase: { createGroupChat_Usecase } } = dependencies;

    const createGroupChatController = async (req: Request, res: Response) => {
        try {
            const { file } = req
            const response = await createGroupChat_Usecase(dependencies).executeFunction(file,req.body);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };

    return createGroupChatController;
};
