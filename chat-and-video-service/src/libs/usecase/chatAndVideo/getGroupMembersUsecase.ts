import { Chat } from "../../entities/chat";

export const getGroupMembers_Usecase = (dependencies: any) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }

    const executeFunction = async (groupId:string) => {
        try {
            if (!groupId) {
                return { status: false, message: "Group Memebers Not Found" };
            }
           
            const getGroupMembers = await chatAndVideoRepository.getGroupMembers(groupId);

            if(getGroupMembers.status===true){
                return {getGroupMembers}
            }else{
                return {status:false,message:"Message Sended not success"}
            }

        } catch (err) {
            return { status: false, message: "Error creating chat: " + err };
        }
    };

    return { executeFunction };
};
