import { Chat } from "../../entities/chat";

export const createChat_Usecase = (dependencies: any) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }

    const executeFunction = async (initiatorId: string, recipientId: string) => {
        try {
            if (!initiatorId || !recipientId) {
                return { status: false, message: "Chat not created because initiator or recipient not found" };
            }
           console.log(initiatorId,"mnbb",recipientId,",jnjkjkkh");
           
            const chatExists = await chatAndVideoRepository.checkHaveAlreadyChatCreated(initiatorId, recipientId);
            console.log(chatExists,"mbhjbh chatExists");
            
            if (chatExists.status===null) {
          
                const chat = new Chat( initiatorId, recipientId );
                console.log(chat,"chat Data structure check");
                
                const response = await chatAndVideoRepository.createChat(chat);
                return { status: true, response };
            }else{
                return { status: false, message: "Chat already exists" };
            }

        } catch (err) {
            return { status: false, message: "Error creating chat: " + err };
        }
    };

    return { executeFunction };
};
