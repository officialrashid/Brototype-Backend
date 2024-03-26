import { Chat } from "../../entities/chat";

export const getGroupMessages_Usecase = (dependencies: any) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }

    const executeFunction = async (groupId:string,senderId:string) => {
        try {
            if (!groupId || !senderId) {
                return { status: false, message: "message not found" };
            }
           
            const getMessages = await chatAndVideoRepository.getGroupMessages(groupId,senderId);

            if(getMessages.status===true){
                return {getMessages}
            }else{
                return {status:false,message:"Messages not found"}
            }

        } catch (err) {
            return { status: false, message: "Error creating chat: " + err };
        }
    };

    return { executeFunction };
};
