

export const updateUnreadMsgZero_Usecase = (dependencies: any) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }

    const executeFunction = async (initiatorId:string,receiverId:string,chatId:string,type:string) => {
        try {
            console.log(initiatorId,receiverId,chatId,type,"alll dataaa cominggg check thataaaa");
            
            if (!initiatorId || !receiverId || !chatId || !type) {
                console.log("eror il keriiiii tttaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                
                return { status: false, message: "not update unread msg zero" };
            }
            const response = await chatAndVideoRepository.updateUnreadMsgZero(initiatorId,receiverId,chatId,type);

            if(response.status===true){
                return {response}
            }else{
                return {response}
            }

        } catch (err) {
            return { status: false, message: "Error creating chat: " + err };
        }
    };

    return { executeFunction };
};
