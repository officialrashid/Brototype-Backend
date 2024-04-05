// sendMessageUsecase.ts
import { Chat } from "../../entities/chat";
import sendMessage from "../../app/repository/chatAndVideo.repository"
import dependencies from "../../../config/dependencies";
export const addUnreadMessageCount_Usecase = async (senderId: string, receiverId: string, chatId:string) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }
   
        try {
            if (!senderId || !receiverId || !chatId) {
                return { status: false, message: "not update unread message count" };
            }

            const unreadMsgCount = await chatAndVideoRepository.addUnreadMessageCount(senderId, receiverId,chatId);
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
export default addUnreadMessageCount_Usecase