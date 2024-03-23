import { uploadToS3 } from "../../../s3";

interface chatData {
    senderId: any;

}

interface chatDetails extends chatData {
    senderId: string;
    audioUrl?: any;
}

export const storeChatVideo_Usecase = (dependencies: any) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }

    const executeFunction = async (data: chatData, file: any) => {
        try {
            if (!data || !file) {
                return { status: false, message: "message not found" };
            }
            const senderId = data.senderId
            if (!file || !senderId) return { message: "Bad Request" };

            const { audioUrl } = await uploadToS3({ file, senderId });
            const chatData: chatDetails = {
                senderId,
                audioUrl,
            };
            console.log(chatData,"chatData chatData");
            
            if(!chatData){
                return {status:false,message:"video not found"}
            }else{
                return {status:true,chatData}
            }


        } catch (err) {
            return { status: false, message: "Error creating chat: " + err };
        }
    };

    return { executeFunction };
};
