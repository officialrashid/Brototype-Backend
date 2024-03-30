import { Request, Response } from "express";


export default (dependencies: any) => {
    const { useCase: { updateGroupMembers_Usecase } } = dependencies;

    const updateGroupMembersController = async (req: Request, res: Response) => {
        try {
            console.log(req.body,"req.body coming from -----");
            
            const response = await updateGroupMembers_Usecase(dependencies).executeFunction(req.body);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };

    return updateGroupMembersController;
};
