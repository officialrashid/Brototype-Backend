import schema from "../dataBase/schema"
import config from "../../../config/config";
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
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
    getAllChatRecipients: async (initiatorId: string) => {
        try {
            if (!initiatorId) {
                return { status: false, message: "Initiator ID not provided" };
            }


            // Query the Chaters collection to find all entries except the one with the provided initiatorId
            const recipients = await schema.Chaters.find({ chaterId: { $ne: initiatorId } });
            const groups = await schema.GroupChat.find({});
            const initiatorGroups: any = [];

            // Loop through each group chat document
            for (const group of groups) {

                for (const participant of group.participants) {


                    // Convert initiatorId to ObjectId
                    const initiatorObjectId = new mongoose.Types.ObjectId(initiatorId);

                    // Check if participant's ID matches initiatorId
                    if (participant.participant && participant.participant.equals(initiatorObjectId)) {
                        // If matched, push the participant's ID to initiatorGroups array
                        initiatorGroups.push(group);
                        break; // Break the loop since we found a match for this document
                    }
                }
            }



            if (recipients.length > 0 || initiatorGroups.length > 0) {


                return { status: true, recipients, initiatorGroups }
            } else {
                return { status: false, message: "your started not chat" }
            }

        } catch (error) {
            return { status: false, message: "Error in getting all chat recipients", error: error };
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
    getGroupMessages: async (groupId: any, senderId: any) => {
        try {
            if (!groupId || !senderId) {
                return { status: false, message: "Sender ID or receiver ID not provided" };
            }
    
            const chat = await schema.GroupChat.findOne({ _id: groupId }).populate("messages lastMessage");
            
    
            if (!chat) {
                return { status: false, message: "Chat not found" };
            }
           console.log(chat,":;;;;;;; chat grpu chat responseeeeeeeeeeeeeeeeeeeeeeee");
           
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

     sendGroupMessage : async (groupId: any, senderId: any, content: any, type: any) => {
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
                senderFirstName : firstName,
                senderLastName : lastName,
                content: content,
                type: type
            });
           console.log(data,"data comingg group message the save function woringg");
           
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
               console.log(response,"group message send response");
               console.log(filterResponse,"group filterResponse send response");
                return { status: true, message: filterResponse, chatId: response?._id };
            }
        } catch (error) {
            return { status: false, message: "Error in creating the message" };
        }
    },
 getGroupMembers : (groupId:string) =>{
    try {
        if(groupId){
            return {status:false,message:"Group Members Not Found"}
        }
        
    } catch (error) {
       return {status:false,message:"Error in the Get Group Members"} 
    }
 }
    
}

