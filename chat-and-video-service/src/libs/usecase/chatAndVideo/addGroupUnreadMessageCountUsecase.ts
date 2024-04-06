// sendMessageUsecase.ts
import { Chat } from "../../entities/chat";
import sendMessage from "../../app/repository/chatAndVideo.repository"
import dependencies from "../../../config/dependencies";
export const addGroupUnreadMessageCount_Usecase = async (groupId: string, senderId: string) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }
   
        try {
            if (!groupId||!senderId) {
                return { status: false, message: "not update unread message count" };
            }

            const unreadMsgCount = await chatAndVideoRepository.addGroupUnreadMessageCount(groupId,senderId);
           console.log(unreadMsgCount,"unreadMsgCount unreadMsgCount unreadMsgCount");
           
            if (unreadMsgCount.status === true && unreadMsgCount.message==="Unread message count updated successfully") {
                return { unreadMsgCount};
            } else {
                return { status: false, message: "Failed Update Unread Message Count" };
            }
        } catch (error) {
            return { status: false, message: "Error sending message: " + error };
        }
};
export default addGroupUnreadMessageCount_Usecase