
import dependencies from "../../../config/dependencies";
export const getCurrentOnlineUsers_Usecase = async () => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }
        try {
            const getOnlineUsers = await chatAndVideoRepository.getCurrentOnlineUsers();
              
            if(getOnlineUsers.status===true){
                return {getOnlineUsers}
            }else{
                return {status:false,message:"Online Users Not Found"}
            }

        } catch (err) {
            return { status: false, message: "Error creating chat: " + err };
        }
};
export default getCurrentOnlineUsers_Usecase