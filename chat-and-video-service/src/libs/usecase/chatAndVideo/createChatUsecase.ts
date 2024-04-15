import { Chat } from "../../entities/chat";

export const createChat_Usecase = (dependencies: any) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }

    const executeFunction = async (initiatorId: string, recipientId: string, chaters: any) => {
        try {
            if (!initiatorId || !recipientId) {
                return { status: false, message: "Chat not created because initiator or recipient not found" };
            }


            const chatExists = await chatAndVideoRepository.checkHaveAlreadyChatCreated(initiatorId, recipientId);

            console.log(chatExists, "chatExistssssssss");

            if (chatExists.response === null) {

                const chat = new Chat(initiatorId, recipientId);
                const response = await chatAndVideoRepository.createChat(chat); // create chat room
                console.log(response, 'dnf dfdfvdvhdfdhfd chat ceare chat respnse');

                if (response.status === true) {

                    const updateChatersExit = await chatAndVideoRepository.updateChatersExit(recipientId) // check chat user update or not
                    console.log(updateChatersExit,"updateChatersExit updateChatersExit updateChatersExit");
                    
                    if (updateChatersExit.status === true && updateChatersExit.message === "chater details not created") {
                        console.log(chaters,"chaters chaters chaters");
                        
                        const updateChaters = await chatAndVideoRepository.updateChatersDetails(chaters, recipientId)
                    }


                }
                return { status: true, response, chatExists };  // return response //
            } else {
                  
                // incase chat already created but chater detail not update case section ////

                const updateChatersExit = await chatAndVideoRepository.updateChatersExit(recipientId)
                if (updateChatersExit.status === true && updateChatersExit.message === "chater details not created") {
                    const updateChaters = await chatAndVideoRepository.updateChatersDetails(chaters, recipientId)
                }
                return { status: false, chatExists }; // return response
            }

        } catch (err) {
            return { status: false, message: "Error creating chat: " + err };
        }
    };

    return { executeFunction };
};
