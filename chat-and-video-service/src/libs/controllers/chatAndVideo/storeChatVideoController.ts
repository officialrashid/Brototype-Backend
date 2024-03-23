import { Request, Response } from "express";

export default (dependencies: any) => {
    const { useCase: { storeChatVideo_Usecase } } = dependencies;

    const storeChatVideoController = async (req: Request, res: Response) => {
        try {
            const {file} = req
            const response = await storeChatVideo_Usecase(dependencies).executeFunction(req.body,file);
            res.status(201).json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };

    return storeChatVideoController;
};
