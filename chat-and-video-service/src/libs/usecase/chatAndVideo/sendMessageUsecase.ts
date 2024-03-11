import { Chat } from "../../entities/chat";

export const sendMessage_Usecase = (dependencies: any) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }

    const executeFunction = async (senderId: string, receiverId: string,content:string) => {
        try {
            if (!senderId || !receiverId || !content) {
                return { status: false, message: "message not send" };
            }
           
            const sendMessage = await chatAndVideoRepository.sendMessage(senderId,receiverId,content);

            if(sendMessage.status===true){
                return {sendMessage}
            }else{
                return {status:false,message:"Message Sended not success"}
            }

        } catch (err) {
            return { status: false, message: "Error creating chat: " + err };
        }
    };

    return { executeFunction };
};
