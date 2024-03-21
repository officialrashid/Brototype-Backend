import { Request, Response } from "express";

export default (dependencies: any) => {
    const { useCase: { storeChatAudio_Usecase } } = dependencies;

    const storeChatAudioController = async (req: Request, res: Response) => {
        try {
            const {file} = req
            const response = await storeChatAudio_Usecase(dependencies).executeFunction(req.body,file);
            res.status(201).json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };

    return storeChatAudioController;
};
