

export const updateParticipantStatus_Usecase = (dependencies: any) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }

    const executeFunction = async (groupId:string,chaterId:string,action:string) => {
        try {
            if (!groupId || !chaterId || !action) {
                return { status: false, message: "participant action not updated,some issue plaease try after some time" };
            }
           
            const response = await chatAndVideoRepository.updateParticipantStatus(groupId,chaterId,action);

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
