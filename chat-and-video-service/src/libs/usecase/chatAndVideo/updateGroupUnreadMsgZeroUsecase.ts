

export const updateGroupUnreadMsgZero_Usecase = (dependencies: any) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }

    const executeFunction = async (groupId:string,senderId:string,type:string) => {
        try {

            if (!groupId || !senderId || !type) {
                return { status: false, message: "not update group memeber unread msg zero" };
            }
            const response = await chatAndVideoRepository.updateGroupUnreadMsgZero(groupId,senderId,type);

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
