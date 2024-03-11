import { Chat } from "../../entities/chat";

export const createChat_Usecase = (dependencies: any) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }

    const executeFunction = async (initiatorId: string, recipientId: string,chaters:any) => {
        try {
            if (!initiatorId || !recipientId) {
                return { status: false, message: "Chat not created because initiator or recipient not found" };
            }
         
           
            const chatExists = await chatAndVideoRepository.checkHaveAlreadyChatCreated(initiatorId, recipientId);
    
            
            if (chatExists.status===null) {
          
                const chat = new Chat( initiatorId, recipientId );
 
                
                const response = await chatAndVideoRepository.createChat(chat);

                    if(response.status===true){
        
                        // const updateChatersExit = await chatAndVideoRepository.updateChatersExit(recipientId)
                        // console.log(updateChatersExit,"dsfhsjhfdsjhgfhsdgfsgfsjhsjf cominggggg tyarr");
                        // // if(response.status)
                        const updateChaters = await chatAndVideoRepository.updateChatersDetails(chaters,recipientId)
                    }
                 
                   
                
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
