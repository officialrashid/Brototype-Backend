import { Chat } from "../../entities/chat";

export const getAllChatRecipients_Usecase = (dependencies: any) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }

    const executeFunction = async (initiatorId:string) => {
        try {
            if (!initiatorId) {
                return { status: false, message: "chat section your not started" };
            }
           
            const getAllChatRecipients = await chatAndVideoRepository.getAllChatRecipients(initiatorId);
            
            if(getAllChatRecipients.status===true){
      
                
                return {getAllChatRecipients}
            }else{
                return {status:false,message:"Message Sended not success"}
            }

        } catch (err) {
            return { status: false, message: "Error creating chat: " + err };
        }
    };

    return { executeFunction };
};
