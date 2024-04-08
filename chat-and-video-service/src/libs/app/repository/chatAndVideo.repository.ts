import schema from "../dataBase/schema"
import config from "../../../config/config";
import jwt from 'jsonwebtoken'
import mongoose, { Types } from 'mongoose';
import admin from 'firebase-admin';
import firebaseAccountCredentials from '../../../../brototype-29983-firebase-adminsdk-9qeji-41b48a5487.json'
import { ObjectId } from "mongodb";

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),

});
interface GroupChatData {
    profile: string;
    groupName: string;
    description: string;
    participants: mongoose.Types.ObjectId[];
    admins: mongoose.Types.ObjectId[];
}
interface Participant {
    initiatorId: Types.ObjectId;
    recipientId: Types.ObjectId;
}

interface Message {
    updatedAt: Date;
}

interface ChatDetails {
    lastMessage: Message;
    _id: Types.ObjectId;
    profile?: string;
    groupName?: string;
    description?: string;
    participants: Participant[];
    admins?: Types.ObjectId[];
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

interface GroupChatDetails {
    lastMessage: Message;
    _id: Types.ObjectId;
    chaterId: Types.ObjectId;
    firstName: string;
    lastName: string;
    phone: string;
    imageUrl: string;
    isOnline: boolean;
    lastSeen: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

interface ChatRecipient {
    details: ChatDetails | GroupChatDetails;
    lastMessage: Message;
}

interface GetAllChatRecipientsResponse {
    status: boolean;
    recipients?: ChatRecipient[];
    message?: string;
    error?: any;
}

export default {

    createChat: async (chatData: { initiatorId: any; recipientId: any; }) => {
        try {
            if (!chatData || !chatData.initiatorId || !chatData.recipientId) {
                return { status: false, message: "Invalid chat data" };
            }

            // Create a new chat instance
            const newChat = new schema.Chat({
                participants: [{
                    initiatorId: chatData.initiatorId,
                    recipientId: chatData.recipientId
                }]
            });

            // Save the new chat to the database
            const response = await newChat.save();

            return { status: true, message: "Chat created successfully", data: response };
        } catch (error) {
            return { status: false, message: "Error creating chat", error: error };
        }
    },

    checkHaveAlreadyChatCreated: async (initiatorId: string, recipientId: string) => {
        try {
            console.log("initiatorId:", initiatorId);
            console.log("recipientId:", recipientId);

            if (!initiatorId || !recipientId) {
                return { status: false, message: "Some issue in Chat Create" };
            }
            const query = {
                $or: [
                    {
                        participants: {
                            $elemMatch: {
                                initiatorId: initiatorId,
                                recipientId: recipientId
                            }
                        }
                    },
                    {
                        participants: {
                            $elemMatch: {
                                initiatorId: recipientId,
                                recipientId: initiatorId
                            }
                        }
                    }
                ]
            };
            console.log("Query:", query);

            const response = await schema.Chat.exists(query);
            console.log("Response:", response);

            console.log(response, "chat already created");
            return { status: false, response };
        } catch (error) {
            console.error("Error:", error);
            return { status: false, message: "Error checking chat existence: " + error };
        }
    },

    sendMessage: async (senderId: string, receiverId: string, content: string, type: string) => {
        try {
            if (!senderId || !receiverId || !content) {
                return { status: false, message: "message send not success" }
            }
            const data = new schema.Messages({

                senderId: senderId,
                receiverId: receiverId,
                content: content,
                type: type
            })
            const messageResponse = await data.save()
            const filterResponse = {
                senderId: messageResponse?.senderId,
                receiverId: messageResponse?.receiverId,
                content: messageResponse?.content,
                type: messageResponse?.type,
            }
            //adding to chat the messageId
            if (messageResponse) {

                const response = await schema.Chat.findOneAndUpdate(
                    {
                        participants: {
                            $elemMatch: {
                                $or:
                                    [
                                        { initiatorId: senderId, recipientId: receiverId },
                                        { recipientId: senderId, initiatorId: receiverId }
                                    ]

                            }
                        }

                    },
                    {
                        $push: { messages: messageResponse._id },
                        $set: { lastMessage: messageResponse._id },
                    }, {
                    new: true
                })
                return { status: true, message: filterResponse, chatId: response?._id }

            }
        } catch (error) {
            return { status: false, message: "Error in the message create" }
        }
    },
    updateChatersDetails: async (chatersDetails: { firstName: string; lastName: string; phone: string; imageUrl: string; }, recipientId: any) => {



        try {
            if (!chatersDetails) {
                return { status: false, message: "Chaters details not provided for update." };
            }


            const chaterData = {
                chaterId: recipientId,
                firstName: chatersDetails.firstName,
                lastName: chatersDetails.lastName,
                phone: chatersDetails.phone,
                imageUrl: chatersDetails.imageUrl
            }
            // If the recipient doesn't exist, create a new document
            const chatersData = await schema.Chaters.create(chaterData);
            ;

            return { status: true, message: "Chaters details updated successfully." };
        } catch (error) {
            return { status: false, message: "Error in updating chaters details." };
        }


    },
    updateChatersExit: async (chaterId: string) => {
        try {
            if (!chaterId) {
                return { status: false, message: "chater not found" }
            }
            const response = await schema.Chaters.find({ chaterId: chaterId })


            if (response && response.length > 0) {
                return { status: false, message: "chater details already created" }

            } else {
                return { status: true, message: "chater details not created" }
            }
        } catch (error) {
            return { status: false, message: "Error in the update Chaters Exist" }
        }
    },
     getAllChatRecipients : async (initiatorId: string): Promise<{ status: boolean; recipients?: any[]; message?: string; error?: any }> => {
        try {
            if (!initiatorId) {
                return { status: false, message: "Initiator ID not provided" };
            }
    
            const initiatorObjectId = new Types.ObjectId(initiatorId);
    
            // Get individual chat recipients
            const individualChats = await schema.Chat.aggregate([
                {
                    $match: {
                        "participants": {
                            $elemMatch: {
                                $or: [
                                    { "initiatorId": initiatorObjectId },
                                    { "recipientId": initiatorObjectId }
                                ]
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: "messages",
                        let: { lastMessageId: "$lastMessage" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ["$_id", "$$lastMessageId"] }
                                }
                            },
                            {
                                $project: {
                                    updatedAt: 1
                                }
                            }
                        ],
                        as: "lastMessageDetails"
                    }
                },
                {
                    $project: {
                        participants: 1,
                        lastMessage: { $arrayElemAt: ["$lastMessageDetails", 0] }
                    }
                }
            ]);
    
            const individualRecipients: any[] = [];
    
            for (const chat of individualChats) {
                for (const participant of chat.participants) {
                    if (
                        participant.initiatorId.equals(initiatorObjectId) ||
                        participant.recipientId.equals(initiatorObjectId)
                    ) {
                        const details = await schema.Chaters.findOne({
                            chaterId: participant.recipientId.equals(initiatorObjectId) ? participant.initiatorId : participant.recipientId
                        });
    
                        // Check if details and lastMessage exist
                        if (details && chat.lastMessage) {
                            // Combine details and lastMessage into newData
                            const newData = { details, lastMessage: chat.lastMessage };
    
                            // Push newData into individualRecipients
                            individualRecipients.push(newData);
                        }
    
                        break; // Break after adding the first participant
                    }
                }
            }
    
            // Get group chat recipients where the initiator is a participant
            const groupChats = await schema.GroupChat.aggregate([
                {
                    $match: {
                        "participants.participant": initiatorObjectId
                    }
                },
                {
                    $lookup: {
                        from: "chaters",
                        localField: "participants.participant",
                        foreignField: "chaterId",
                        as: "groupParticipants"
                    }
                }
            ]);
            console.log(groupChats,"group chatsss");
            
            // Combine individual and group chat recipients
            const allRecipients = [...individualRecipients, ...groupChats];
         
            console.log(allRecipients,"lllllll");
            
            // Sort all recipients based on last message's updatedAt timestamp
            allRecipients.sort((a: any, b: any) => {
                 console.log(a,"this is aaaaaa");
                 console.log(b,"this is bbbbbbb");
                // Extract the updatedAt timestamps for comparison
                const aUpdatedAt = a.lastMessage ? new Date(a?.lastMessage?.updatedAt || a?.updatedAt).getTime() : 0;
                const bUpdatedAt = b.lastMessage ? new Date(b?.lastMessage.updatedAt || b?.updatedAt).getTime() : 0;
    
                // Sort by updatedAt timestamp in descending order
                return bUpdatedAt - aUpdatedAt;
            });
           
            
            return { status: true, recipients: allRecipients };
        } catch (error) {
            return { status: false, message: "Error in getting all chat recipients", error };
        }
    },
    getMessages: async (initiatorId: string, recipientId: string) => {
        try {
            if (!initiatorId || !recipientId) {
                return { status: false, message: "Sender ID or receiver ID not provided" };
            }

            const chat = await schema.Chat.findOne({
                $or: [
                    { "participants.initiatorId": initiatorId, "participants.recipientId": recipientId },
                    { "participants.initiatorId": recipientId, "participants.recipientId": initiatorId }
                ]
            }).populate("messages lastMessage");

            if (!chat) {
                return { status: false, message: "Chat not found" };
            }



            return { status: true, messages: chat.messages, lastMessage: chat.lastMessage };
        } catch (error) {
            return { status: false, message: "Error in getting messages", error: error };
        }
    },
    getGroupMessages: async (groupId: any, initiatorId: any) => {
        try {
            if (!groupId || !initiatorId) {
                return { status: false, message: "Sender ID or receiver ID not provided" };
            }

            const chat = await schema.GroupChat.findOne({ _id: groupId }).populate("messages lastMessage");


            if (!chat) {
                return { status: false, message: "Chat not found" };
            }


            return { status: true, messages: chat.messages, lastMessage: chat.lastMessage };
        } catch (error) {
            return { status: false, message: "Error in getting messages", error: error };
        }
    },

    createGroupChat: async (groupChatData: any) => {
        try {
            if (!groupChatData) {
                return { status: false, message: "Group chat data not found, please try after some time" };
            }

            // Convert participant and admin IDs to ObjectId
            const participants = groupChatData.participants.map((participant: any) => ({
                participant: new mongoose.Types.ObjectId(participant),
                unreadMessagesCount: participant.unreadMessagesCount || 0
            }));
            const admins = groupChatData.admins.map((admin: string) => new mongoose.Types.ObjectId(admin));

            // Create group chat data object
            const data = {
                profile: groupChatData.profile,
                groupName: groupChatData.groupName,
                description: groupChatData.description,
                participants: participants, // Include participant IDs along with unreadMessagesCount
                admins: admins
            };

            // Create new GroupChat document
            const response = await schema.GroupChat.create(data);

            if (response) {
                return { status: true, response };
            } else {
                return { status: false, message: "Failed to create group chat. Please try again later." };
            }
        } catch (error) {
            console.error("Error in the createGroupChat function:", error);
            return { status: false, message: "Error in the createGroupChat function" };
        }
    },

    sendGroupMessage: async (groupId: any, senderId: any, content: any, type: any) => {
        try {
            if (!groupId || !senderId || !content) {
                return { status: false, message: "Message sending failed" };
            }

            // Fetch sender's information from the Chaters schema
            const senderName = await schema.Chaters.findOne({ chaterId: new ObjectId(senderId) });

            // Extract first name and last name from sender's information
            const firstName = senderName?.firstName ?? "";
            const lastName = senderName?.lastName ?? "";

            // Create a new GroupMessages document
            const data = new schema.GroupMessages({
                groupId: groupId,
                senderId: senderId,
                senderFirstName: firstName,
                senderLastName: lastName,
                content: content,
                type: type
            });
            console.log(data, "data comingg group message the save function woringg");

            // Save the new GroupMessages document
            const messageResponse = await data.save();

            // Prepare the response object
            const filterResponse = {
                groupId: messageResponse?.groupId,
                senderId: messageResponse?.senderId,
                content: messageResponse?.content,
                type: messageResponse?.type,
                senderFirstName: firstName,
                senderLastName: lastName
            };

            // Update the GroupChat document with the new message
            if (messageResponse) {
                const response = await schema.GroupChat.findOneAndUpdate(
                    { _id: groupId },
                    {
                        $push: { messages: messageResponse._id },
                        $set: { lastMessage: messageResponse._id }
                    },
                    { new: true }
                );
                console.log(response, "group message send response");
                console.log(filterResponse, "group filterResponse send response");
                return { status: true, message: filterResponse, chatId: response?._id };
            }
        } catch (error) {
            return { status: false, message: "Error in creating the message" };
        }
    },
    getGroupMembers: async (groupId: any) => {
        try {
            if (!groupId) {
                return { status: false, message: "Group Members Not Found" }
            }
            console.log(groupId, "{}{}{}{}{}*(*************^^^^^^^&&&&&&&&&&&&&&&&&&&&");

            const response = await schema.GroupChat.aggregate([
                {
                    $match: {
                        "_id": new ObjectId(groupId)
                    }
                },
                {
                    $lookup: {
                        from: "chaters",
                        localField: "participants.participant",
                        foreignField: "chaterId", // Assuming _id is the field representing participant IDs in the chaters collection
                        as: "participantDetails"
                    }
                }
            ]);

            return { participants: response[0].participantDetails, admins: response[0].admins };

        } catch (error) {
            return { status: false, message: "Error in the Get Group Members" }
        }
    },

    updateParticipantStatus: async (groupId: string, chaterId: string, action: string) => {
        try {
            console.log(groupId, chaterId, action);

            const group = await schema.GroupChat.findOne({ _id: new ObjectId(groupId) });
            if (!group) {
                return { status: false, message: "Group Not Found" };
            }

            if (action === "admin") {
                group.admins.push(new ObjectId(chaterId));
                await group.save();
                console.log("Admin added successfully");
                return { status: true, message: "Admin added successfully" };
            } else if (action === "delete") {
                const index = group.participants.findIndex((participant: any) => participant.participant.toString() === chaterId);
                if (index === -1) {
                    return { status: false, message: "Participant Not Found" };
                }
                group.participants.splice(index, 1);
                await group.save();
                console.log("Participant deleted successfully");
                return { status: true, message: "Participant deleted successfully" };
            } else {
                return { status: false, message: "Invalid action" };
            }
        } catch (error) {

            return { status: false, message: "Error in updating group chat participants status" };
        }
    },
    updateGroupMembers: async (groupChatData: any) => {
        try {
            if (!groupChatData) {
                return { status: false, message: "Not Updated Group Members" };
            }

            // Iterate over the participants array and construct an array of objects
            const participants = groupChatData.participants.map((participant: string) => ({
                participant: new mongoose.Types.ObjectId(participant),
                unreadMessagesCount: 0 // Set the unreadMessagesCount to 0 or any default value
            }));
            console.log(participants, "::::::");

            // Perform the update operation
            const response = await schema.GroupChat.updateOne(
                { _id: new ObjectId(groupChatData.groupId) }, // Query to find the document by _id
                { $push: { participants: { $each: participants } } } // Use $push to add new participants
            );

            if (response) {
                return { status: true, message: "Group Members Updated Successfully" };
            } else {
                return { status: false, message: "Group Members Not Updated" };
            }
        } catch (error) {
            return { status: false, message: "Error in updating group Members: " + error };
        }
    },
    deleteMessage: async (messageId: string, action: string) => {
        if (!messageId || !action) {
            return { status: false, message: "message not deleled,some issue please try after some time" }
        }
        if (action === "group") {
            const response = await schema.GroupMessages.deleteOne({ _id: new ObjectId(messageId) })
            console.log(response);
            if (response) {
                console.log("kerii delte il keriii kkunu");

                return { status: true, response }
            }
        } else if (action === "oneToOne") {
            const response = await schema.Messages.deleteOne({ _id: new ObjectId(messageId) })
            console.log(response);
            if (response) {
                console.log("kerii delte il keriii kkunu");

                return { status: true, response }
            }
        }


    },
    updateOnlineOrOffline: async (chaterId: string) => {
        try {
            if (!chaterId) {
                return { status: false, message: "status online or offline not updated" }
            }
            const response = await schema.Chaters.updateOne({ chaterId: new ObjectId(chaterId) }, { $set: { isOnline: true } })
            console.log(response);

            if (!response) {
                return { status: false, message: "status online or offline not updated" }
            } else {
                const onlineUsers = await schema.Chaters.find({})

                if (onlineUsers.length > 0) {
                    return { status: true, onlineUsers }
                } else {
                    return { status: false, message: "No Online Users Found" }
                }
            }
        } catch (error) {
            return { status: false, message: "Erro in the update user online or offline" }
        }
    },
    updateOfflineUser: async (chaterId: string) => {
        try {
            if (!chaterId) {
                return { status: false, message: "Chater ID is required" };
            }

            const currentDate = new Date();
            let hours = currentDate.getHours();
            let minutes: any = currentDate.getMinutes();
            const ampm = hours >= 12 ? "pm" : "am";

            // Convert hours to 12-hour format
            hours = hours % 12;
            hours = hours ? hours : 12; // Handle midnight (0 hours)

            // Add leading zero to minutes if less than 10
            minutes = minutes < 10 ? "0" + minutes : minutes;

            const lastSeen = hours + ":" + minutes + " " + ampm;

            console.log(lastSeen, "lastSeen lastSeen lastSeen");

            const response = await schema.Chaters.updateOne(
                { chaterId: new ObjectId(chaterId) },
                { $set: { isOnline: false, lastSeen: lastSeen } }
            );

            console.log(response);

            if (!response) {
                return { status: false, message: "Status (online/offline) not updated" };
            } else {
                // Find online users (if any) after updating lastSeen
                const onlineUsers = await schema.Chaters.find({});


                if (onlineUsers.length > 0) {
                    return { status: true, onlineUsers };
                } else {
                    return { status: false, message: "No online users found" };
                }
            }
        } catch (error) {
            console.error("Error in updating user online or offline:", error);
            return { status: false, message: "Error in updating user online or offline" };
        }
    },
    getCurrentOnlineUsers: async () => {
        try {

            // Find online users (if any) after updating lastSeen
            const onlineUsers = await schema.Chaters.find({});


            if (onlineUsers.length > 0) {
                return { status: true, onlineUsers };
            } else {
                return { status: false, message: "No online users found" };
            }
        } catch (error) {
            console.error("Error in updating user online or offline:", error);
            return { status: false, message: "Error in updating user online or offline" };
        }
    },
    addUnreadMessageCount: async (initiatorId: string, receiverId: any, chatId: any) => {
        try {
            if (!initiatorId || !receiverId || !chatId) {
                return { status: false, message: "Not updating unread message count" };
            }
            console.log(receiverId, "receiverId receiverId receiverId receiverId");

            // Find the chat based on chatId and participants
            const chat = await schema.Chat.findOne({
                _id: chatId,
                $or: [
                    { 'participants.initiatorId': initiatorId, 'participants.recipientId': receiverId },
                    { 'participants.initiatorId': receiverId, 'participants.recipientId': initiatorId }
                ]
            });

            if (!chat) {
                return { status: false, message: "Chat not found" };
            }

            // Determine which user is the sender and which one is the receiver
            const isInitiatorSender = chat.participants[0].initiatorId.toString() === initiatorId;

            // Increment unread message count for the appropriate user
            if (isInitiatorSender) {
                await schema.Chat.updateOne(
                    {
                        _id: chatId,
                        'participants.recipientId': receiverId // Match the recipientId
                    },
                    {
                        $inc: { 'participants.$.recipientUnReadMessages': 1 } // Increment recipient's unread count
                    }
                );
            } else {
                console.log("else il keriii ttaaaa");

                await schema.Chat.updateOne(
                    {
                        _id: chatId,
                        'participants.initiatorId': receiverId // Match the initiatorId
                    },
                    {
                        $inc: { 'participants.$.initiatorUnReadMessages': 1 } // Increment initiator's unread count
                    }
                );
            }

            return { status: true, message: "Unread message count updated successfully" };
        } catch (error) {
            console.error(error);
            return { status: false, message: "Error occurred while updating unread message count" };
        }
    },

    getUserUnreadMessageCounts: async (initiatorId: string | mongoose.Types.ObjectId) => {
        try {
            // Find all one-to-one chats where the initiatorId matches either initiatorId or recipientId
            const oneToOneChats = await schema.Chat.find({
                $or: [
                    { 'participants.initiatorId': initiatorId },
                    { 'participants.recipientId': initiatorId }
                ]
            });

            // Find all group chats where the initiatorId is a participant
            const groupChats: any = await schema.GroupChat.find({
                'participants.participant': initiatorId
            });

            // Array to store unread message counts for each user
            const unreadCounts: { chaterId: string, oppositorId: string, unreMsgCount: number }[] = [];

            // Process one-to-one chats
            if (oneToOneChats) {
                oneToOneChats.forEach(chat => {
                    chat.participants.forEach(participant => {
                        if (participant.initiatorId.toString() !== initiatorId.toString()) {
                            unreadCounts.push({ chaterId: participant.initiatorId.toString(), oppositorId: participant.recipientId.toString(), unreMsgCount: participant.recipientUnReadMessages });
                        }
                        if (participant.recipientId.toString() !== initiatorId.toString()) {
                            unreadCounts.push({ chaterId: participant.recipientId.toString(), oppositorId: participant.initiatorId.toString(), unreMsgCount: participant.initiatorUnReadMessages });
                        }
                    });
                });
            }

            // Process group chats
            if (groupChats) {
                groupChats.forEach((chat: { participants: any[]; _id: { toString: () => any; }; }) => {
                    chat.participants.forEach(participant => {
                        if (participant.participant.toString() === initiatorId.toString()) {
                            unreadCounts.push({ chaterId: chat._id.toString(), oppositorId: "", unreMsgCount: participant.unreadMessagesCount });
                        }
                    });
                });
            }

            console.log(unreadCounts); // Output unread message counts for all users

            return { status: true, message: "Unread message counts retrieved successfully", unreadCounts };
        } catch (error) {
            console.error(error);
            return { status: false, message: "Error occurred while fetching unread message counts" };
        }
    },

    addGroupUnreadMessageCount: async (groupId: string, senderId: string) => {
        try {
            if (!groupId || !senderId) {
                return { status: false, message: "Not updating group unread message count" };
            }

            const group: any = await schema.GroupChat.findById(groupId);

            if (!group) {
                return { status: false, message: "Group not found" };
            }

            group.participants.forEach((participant: { participant: { toString: () => string; }; unreadMessagesCount: number; }) => {
                if (participant.participant.toString() !== senderId) {
                    participant.unreadMessagesCount += 1;
                }
            });

            await group.save();

            return { status: true, message: "Group unread message count updated successfully" };
        } catch (error) {
            console.error(error);
            return { status: false, message: "Error in updating group unread message count" };
        }
    },
    updateUnreadMsgZero: async (initiatorId: string, receiverId: string, chatId: string, type: string) => {
        try {
            if (!initiatorId || !receiverId || !chatId) {
                return { status: false, message: "Not updating unread message count" };
            }
            console.log("zero settin startedd");

            // Find the chat based on chatId and participants
            const chat = await schema.Chat.findOne({
                _id: chatId,
                $or: [
                    { 'participants.initiatorId': initiatorId, 'participants.recipientId': receiverId },
                    { 'participants.initiatorId': receiverId, 'participants.recipientId': initiatorId }
                ]
            });

            if (!chat) {
                return { status: false, message: "Chat not found" };
            }

            // Determine which user is the sender and which one is the receiver
            if (type === "oneToOne") {
                console.log("keriii oneToOne");

                const isInitiatorSender = chat.participants[0].initiatorId.toString() === initiatorId;

                // Increment unread message count for the appropriate user
                if (isInitiatorSender) {
                    console.log("keriiiiiii");

                    await schema.Chat.updateOne(
                        {
                            _id: chatId,
                            'participants.initiatorId': initiatorId // Match the recipientId
                        },
                        {
                            $set: { 'participants.$.initiatorUnReadMessages': 0 } // Increment recipient's unread count
                        }
                    );
                } else {
                    console.log("else il keriii ttaaaa");

                    await schema.Chat.updateOne(
                        {
                            _id: chatId,
                            'participants.recipientId': initiatorId // Match the initiatorId
                        },
                        {
                            $set: { 'participants.$.recipientUnReadMessages': 0 } // Increment initiator's unread count
                        }
                    );
                }

                return { status: true, message: "Unread message count zero updated successfully" };
            } else {

            }

        } catch (error) {
            console.error(error);
            return { status: false, message: "Error occurred while updating unread message count" };
        }
    },
    updateGroupUnreadMsgZero: async (groupId: string, senderId: string, type: string) => {
        try {
            if (!groupId || !senderId || !type) {
                return { status: false, message: "not update group member unread message count zero" }
            }
            if (type === "group") {
                const group: any = await schema.GroupChat.findById(groupId);

                if (!group) {
                    return { status: false, message: "Group not found" };
                }

                group.participants.forEach((participant: { participant: { toString: () => string; }; unreadMessagesCount: number; }) => {
                    if (participant.participant.toString() === senderId) {
                        participant.unreadMessagesCount = 0;
                    }
                });

                await group.save();

                return { status: true, message: "Group member unread message count zero updated successfully" };
            }
        } catch (error) {
            return { status: false, message: "Error occurred while updating group memeber unread message count" }
        }
    }

}