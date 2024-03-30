
import dependencies from "../../../config/dependencies";
export const deleteMessage_Usecase = async (messageId:string,action:string) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }
        try {
            if (!messageId || !action) {
                return { status: false, message: "message not found" };
            }
           
            const deleteMessage = await chatAndVideoRepository.deleteMessage(messageId,action);
              console.log(deleteMessage,"deleteMessage deleteMessage");
              
            if(deleteMessage.status===true){
                return {deleteMessage}
            }else{
                return {status:false,message:"Messages not found"}
            }

        } catch (err) {
            return { status: false, message: "Error creating chat: " + err };
        }
};
export default deleteMessage_Usecase