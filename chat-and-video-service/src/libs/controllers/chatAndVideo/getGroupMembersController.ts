import { Request, Response } from "express";


export default (dependencies: any) => {
    const { useCase: { getGroupMembers_Usecase } } = dependencies;

    const getGroupMembersController = async (req: Request, res: Response) => {
        try {
            const { groupId } = req.params;
            console.log(groupId," groupId coming params wayssssssss");
            
            const response = await getGroupMembers_Usecase(dependencies).executeFunction(groupId);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };

    return getGroupMembersController;
};
