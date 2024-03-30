export const updateGroupMembers_Usecase = (dependencies: any) => {
    const { repository: { chatAndVideoRepository } } = dependencies;

    if (!chatAndVideoRepository) {
        throw new Error("Error: chatAndVideo Repository not found");
    }

    const executeFunction = async (data: any) => {
        try {
            if (!data || !data.participantsDetails || !Array.isArray(data.participantsDetails)) {
                return { status: false, message: "Group Members Not Updated, Because of Members data not found or invalid" };
            }

            const response = await Promise.all(data.participantsDetails.map(async (participant: any) => {
                const groupChatersId = participant.superleadId || participant.studentId;

                const updateChatersExit = await chatAndVideoRepository.updateChatersExit(groupChatersId);
                if (updateChatersExit.status === true && updateChatersExit.message === "chater details not created") {
                    const updateChaters = await chatAndVideoRepository.updateChatersDetails(participant, groupChatersId);
                    return updateChaters;
                }
            }));

            if (response) {
                const updateMembersDetails = {
                    groupId: data.groupId,
                    participants: data.participants,
                };

                const updateGroupMembers = await chatAndVideoRepository.updateGroupMembers(updateMembersDetails);

                if (updateGroupMembers.status === true) {
                    return { updateGroupMembers };
                } else {
                    return { status: false, message: "Members Not Updated, some issue occurred, please try after some time" };
                }
            } else {
                return { status: false, message: "Members Not Updated, some issue occurred, please try after some time" };
            }
        } catch (err) {
            return { status: false, message: "Error creating chat: " + err };
        }
    };

    return { executeFunction };
};
