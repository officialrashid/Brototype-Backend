import schema from "../dataBase/schema"
import config from "../../../config/config";
import jwt from 'jsonwebtoken'

import admin from 'firebase-admin';
import firebaseAccountCredentials from '../../../../brototype-29983-firebase-adminsdk-9qeji-41b48a5487.json'

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),

});

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
            if (!initiatorId || !recipientId) {
                return { status: false, message: "Some issue in Chat Create" };
            }
            const response = await schema.Chat.exists({
                participants: {
                    $elemMatch: {
                        initiatorId: initiatorId,
                        recipientId: recipientId
                    }
                }
            });
            return { status: response, message: response ? "Chat already exists" : "Chat does not exist" };
        } catch (error) {
            return { status: false, message: "Error checking chat existence: " + error };
        }
    },
    sendMessage: async (senderId: string, receiverId: string, content: string) => {
        try {
            if (!senderId || !receiverId || !content) {
                return { status: false, message: "message send not success" }
            }
            const data = new schema.Messages({

                senderId: senderId,
                receiverId: receiverId,
                content: content
            })
            const messageResponse = await data.save()
            const filterResponse = {
                senderId: messageResponse?.senderId,
                receiverId: messageResponse?.receiverId,
                content: messageResponse?.content
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


            if (recipients.length > 0) {
                console.log(recipients,"fdbfdfhbdbfdfhjd");
                
                return { status: true, recipients }
            } else {
                return { status: false, message: "your started not chat" }
            }

        } catch (error) {
            return { status: false, message: "Error in getting all chat recipients", error: error };
        }
    },
 getMessages : async (initiatorId: string, recipientId: string) => {
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
    
}