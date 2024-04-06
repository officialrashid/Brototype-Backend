import { Chat } from "../../entities/chat";

export const getUnreadMsgCount_Usecase = (dependencies: any) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }

    const executeFunction = async (initiatorId:string) => {
        try {
            if (!initiatorId) {
                return { status: false, message: "message not found" };
            }
           
            const getUnreadMsgCount = await chatAndVideoRepository.getUserUnreadMessageCounts(initiatorId);

            if(getUnreadMsgCount.status===true){
                return {getUnreadMsgCount}
            }else{
                return {status:false,message:"Not Get Unread Message Count"}
            }

        } catch (err) {
            return { status: false, message: "Error creating chat: " + err };
        }
    };

    return { executeFunction };
};
