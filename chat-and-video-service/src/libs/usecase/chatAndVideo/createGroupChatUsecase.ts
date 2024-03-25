import { uploadToS3 } from "../../../groupProfileS3";

interface chatData {
    createrId: any;

}

interface chatDetails extends chatData {
    createrId: string;
    groupProfile?: any;
}
export const createGroupChat_Usecase = (dependencies: any) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }

    const executeFunction = async (file: any, data: any) => {
        try {
            if (!file || !data) {
                return { status: false, message: "Group Chat Not Created Beacause Group Chat Datas not found" };
            }

            const parsedData = await data.participantsDetails.map(JSON.parse); // Parse each JSON string into an object


            const response = await Promise.all(parsedData.map(async (data: any, index: number) => {
                const groupChatersId = data.superleadId || data.studentId;


                const updateChatersExit = await chatAndVideoRepository.updateChatersExit(groupChatersId); // check chat user update or not
                if (updateChatersExit.status === true && updateChatersExit.message === "chater details not created") {
                    const updateChaters = await chatAndVideoRepository.updateChatersDetails(data, groupChatersId);
                    return updateChaters; // Return the result of updateChaters
                }
            }));

            if (response) {
                const createrId = data.createrId
                if (!file || !createrId) return { message: "Bad Request" };

                const { groupProfile } = await uploadToS3({ file, createrId });
                const chatData: chatDetails = {
                    createrId,
                    groupProfile,
                };
                if (!chatData) {
                    return { status: false, message: "group profile not found" }
                } else {

                    if (data && groupProfile) {
                        const groupChatDetails = {
                            profile: groupProfile,
                            groupName: data.groupName,
                            description: data.description,
                            participants: data.participants,
                            admins: data.admins

                        }
                        const createGroupChat = await chatAndVideoRepository.createGroupChat(groupChatDetails)

                        if (createGroupChat.status === true) {
                            return { createGroupChat }
                        } else {
                            return { status: false, message: "group chat not created some issue, please try after some time" }
                        }
                    } else {
                        return { status: false, message: "group chat not created some issue, please try after some time" }
                    }
                }
            } else {
                return { status: false, message: "group chat not created some issue, please try after some time" }
            }

        } catch (err) {
            return { status: false, message: "Error creating chat: " + err };
        }
    };

    return { executeFunction };
};
