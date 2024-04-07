import { Server } from "socket.io";
import { sendMessage_Usecase } from "../libs/usecase/chatAndVideo/sendMessageUsecase";
import { sendGroupMessage_Usecase } from "../libs/usecase/chatAndVideo/sendGroupMessageUsecase";
import { deleteMessage_Usecase } from "../libs/usecase/chatAndVideo/deleteMessageUsecase";
import { updateOnlineOrOffline_Usecase } from "../libs/usecase/chatAndVideo/updateOnlineOrOfflineUsecase";
import {updateOfflineUser_Usecase} from "../libs/usecase/chatAndVideo/updateOfflineUserUsecase";
import {getCurrentOnlineUsers_Usecase} from "../libs/usecase/chatAndVideo/getCurrentOnlineUsers";
import {addUnreadMessageCount_Usecase} from "../libs/usecase/chatAndVideo/addUnreadMessageCountUsecase"
import { addGroupUnreadMessageCount_Usecase } from "../libs/usecase";
const socketConnection = async (server: any) => {
    const io = new Server(server, { cors: { origin: "*" } });

    io.on('connection', (socket) => {
        console.log("Socket connection successfully");

        socket.on('message', async (data) => {
            try {
                const { senderId, receiverId, content, type } = data;
                const response = await sendMessage_Usecase(senderId, receiverId, content, type);
                if (response?.status === true && response?.sendMessage?.chatId) {
                    const roomId = response.sendMessage.chatId.toString()
                    const addUnreadMessageCount = await addUnreadMessageCount_Usecase(senderId,receiverId,roomId)
                    const payload = {
                        chatId: roomId,
                        content: response.sendMessage.message
                    };
                    io.to(roomId).emit("received", payload);
                    socket.emit("messageResponse", { status: true });
                    socket.broadcast.emit("notification", { message: "This is a broadcast message!" });
                } else {
                    console.error("Failed to send message:", response?.message);
                    socket.emit("messageResponse", { status: false, message: response?.message });
                }
            } catch (error) {
                console.error("Error processing message:", error);
                socket.emit("messageResponse", { status: false, message: error });
            }
        });

        socket.on('groupMessage', async (data) => {
            try {
                const { groupId, senderId, content, type } = data;
                const response = await sendGroupMessage_Usecase(groupId, senderId, content, type);
                const addUnreadMessageCount = await addGroupUnreadMessageCount_Usecase(groupId,senderId)
                console.log(response, "group message response coming  sockettt");

                if (response?.status === true && response?.sendMessage?.chatId) {
                    const roomId = response.sendMessage.chatId.toString();
                    const payload = {
                        chatId: roomId,
                        content: response.sendMessage.message
                    };
                    io.to(roomId).emit("received", payload);
                    socket.emit("groupMessageResponse", { status: true });
                    socket.broadcast.emit("notification", { message: "This is a broadcast message!" });
                } else {
                    console.error("Failed to send message:", response?.message);
                    socket.emit("messageResponse", { status: false, message: response?.message });
                }
            } catch (error) {
                console.error("Error processing message:", error);
                socket.emit("messageResponse", { status: false, message: error });
            }
        });
        socket.on('deleteMessage', async (data) => {
            try {
                const { chatId, messageId, action } = data;
                console.log(chatId, "chatId coming delete sectionsss");

                const response = await deleteMessage_Usecase(messageId, action);
                console.log(response, "delete Message response coming  sockettt");

                if (response?.deleteMessage?.status === true) {
                    console.log("status true il keriyannuuuuuuuuuuuuuuuu");

                    const roomId = chatId;
                    const payload = {
                        status: true,
                        message: "message deleted successfullt"
                    }
                    io.to(roomId).emit("messageDeleted", payload);
                }
            } catch (error) {
                console.error("Error processing message:", error);
                socket.emit("messageResponse", { status: false, message: error });
            }
        });


        socket.on("addOnlineUser", async (newUserId) => {
            if (!newUserId) {
                return
            }
            const response = await updateOnlineOrOffline_Usecase(newUserId);
            if (response?.getOnlineUsers?.status === true) {
                 
                io.emit('getOnlineUser', response?.getOnlineUsers?.onlineUsers);
            }
            // Send all active users to the new user

        });

        socket.on('setOfflineUser', async (userId) => {
            if (!userId) {
                return
            }
         const response = await updateOfflineUser_Usecase(userId)
         if (response?.getOnlineUsers?.status === true) {
            
               
            io.emit('getOnlineUser', response?.getOnlineUsers?.onlineUsers);
        }
        });
        socket.on('getCurrentOnlineUser', async () => {
         const response = await getCurrentOnlineUsers_Usecase()
         if (response?.getOnlineUsers?.status === true) { 
            io.emit('currentOnlineUser', response?.getOnlineUsers?.onlineUsers);
        }
        });
        socket.on('joinRoom', async (chatId) => {
            console.log('receive join room event');
            console.log(`joined a particular room ${chatId}`);
            socket.join(chatId);
        });


        socket.on('disconnect', () => {
            console.log("caliiingg disconnecteeeeeeee");
            console.log("socket disconnected", socket.id)
            // onlineUsers = onlineUsers.filter((user: { socketId: string; }) => user.socketId !== socket.id)
            // console.log("user disconnected", onlineUsers);
            // // send all online users to all users
            // io.emit("getOnlineUser", onlineUsers);
        })
        socket.on('error', (error: any) => {
            console.error(`Socket error for client ${socket.id}:`, error);
        });
    });
    io.on('error', (error) => {
        console.log('error occure while connection socker', error)
    })

};

export default socketConnection;
