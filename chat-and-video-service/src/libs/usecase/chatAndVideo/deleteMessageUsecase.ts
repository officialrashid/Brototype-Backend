

export const deleteMessage_Usecase = (dependencies: any) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }

    const executeFunction = async (messageId:string,action:string) => {
        try {
            if (!messageId || !action) {
                return { status: false, message: "message not found" };
            }
           
            const getMessages = await chatAndVideoRepository.deleteMessage(messageId,action);

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
