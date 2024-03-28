import { Request, Response } from "express";


export default (dependencies: any) => {
    const { useCase: { updateParticipantStatus_Usecase } } = dependencies;

    const updateParticipantStatusController = async (req: Request, res: Response) => {
        try {
         
            const { groupId,chaterId,action } = req.body
            
            const response = await updateParticipantStatus_Usecase(dependencies).executeFunction(groupId,chaterId,action);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };

    return updateParticipantStatusController;
};
