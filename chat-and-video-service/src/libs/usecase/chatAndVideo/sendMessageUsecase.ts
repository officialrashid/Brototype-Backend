// sendMessageUsecase.ts
import { Chat } from "../../entities/chat";
import sendMessage from "../../app/repository/chatAndVideo.repository"
import dependencies from "../../../config/dependencies";
export const sendMessage_Usecase = async (senderId: string, receiverId: string, content: string) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }
   
        try {
            if (!senderId || !receiverId || !content) {
                return { status: false, message: "Message not sent" };
            }

            const sendMessage = await chatAndVideoRepository.sendMessage(senderId, receiverId, content);

            if (sendMessage.status === true) {
                return { status: true, message: "Message sent successfully", sendMessage };
            } else {
                return { status: false, message: "Failed to send message" };
            }
        } catch (error) {
            return { status: false, message: "Error sending message: " + error };
        }
};
export default sendMessage_Usecase