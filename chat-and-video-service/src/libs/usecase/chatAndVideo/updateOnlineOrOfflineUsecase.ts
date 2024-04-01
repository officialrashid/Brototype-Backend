
import dependencies from "../../../config/dependencies";
export const updateOnlineOrOffline_Usecase = async (chaterId:string) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }
        try {
            if (!chaterId) {
                return { status: false, message: "status not updated" };
            }
           
            const getOnlineUsers = await chatAndVideoRepository.updateOnlineOrOffline(chaterId);
              
            if(getOnlineUsers.status===true){
                return {getOnlineUsers}
            }else{
                return {status:false,message:"Online Users Not Found"}
            }

        } catch (err) {
            return { status: false, message: "Error creating chat: " + err };
        }
};
export default updateOnlineOrOffline_Usecase