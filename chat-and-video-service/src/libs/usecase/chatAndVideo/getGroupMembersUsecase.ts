import { Chat } from "../../entities/chat";

export const getGroupMembers_Usecase = (dependencies: any) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }

    const executeFunction = async (groupId:string) => {
        try {
            if (!groupId) {
                return { status: false, message: "Group Memebers Not Found" };
            }
           console.log(groupId,"groupid in usecadeeee");
           
            const response = await chatAndVideoRepository.getGroupMembers(groupId);

             
            if(!response){
                return {status:false,message:"Group Members Not Found"}
           
            }else{
                return {status:true,response} 
            }

        } catch (err) {
            return { status: false, message: "Error creating chat: " + err };
        }
    };

    return { executeFunction };
};
