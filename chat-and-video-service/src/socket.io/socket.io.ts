import { Server } from "socket.io";
import { sendMessage_Usecase } from "../libs/usecase/chatAndVideo/sendMessageUsecase";
import { sendGroupMessage_Usecase } from "../libs/usecase/chatAndVideo/sendGroupMessageUsecase";
import {deleteMessage_Usecase} from "../libs/usecase/chatAndVideo/deleteMessageUsecase"
const socketConnection = async (server: any) => {
    const io = new Server(server, { cors: { origin: "*" } });

    io.on('connection', (socket) => {
        console.log("Socket connection successfully");

        socket.on('message', async (data) => {
            try {
                const { senderId, receiverId, content , type} = data;
                const response = await sendMessage_Usecase(senderId, receiverId, content, type);

                if (response?.status === true && response?.sendMessage?.chatId) {
                    const roomId = response.sendMessage.chatId.toString();
                    const payload = {
                        chatId: roomId,
                        content: response.sendMessage.message
                    };
                    io.to(roomId).emit("received", payload);
                    socket.emit("messageResponse", { status: true });
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
                const { groupId, senderId, content , type} = data;
                const response = await sendGroupMessage_Usecase(groupId, senderId, content, type);
                  console.log(response,"group message response coming  sockettt");
                  
                if (response?.status === true && response?.sendMessage?.chatId) {
                    const roomId = response.sendMessage.chatId.toString();
                    const payload = {
                        chatId: roomId,
                        content: response.sendMessage.message
                    };
                    io.to(roomId).emit("received", payload);
                    socket.emit("groupMessageResponse", { status: true });
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
                const { chatId,messageId, action} = data;
                console.log(chatId,"chatId coming delete sectionsss");
                
                const response = await deleteMessage_Usecase(messageId,action);
                  console.log(response,"delete Message response coming  sockettt");
                  
                if (response?.deleteMessage?.status === true) {
                    console.log("status true il keriyannuuuuuuuuuuuuuuuu");
                    
                    const roomId = chatId;
                    const payload = {
                        status:true,
                        message:"message deleted successfullt"
                    }
                    io.to(roomId).emit("messageDeleted",payload);
                }
            } catch (error) {
                console.error("Error processing message:", error);
                socket.emit("messageResponse", { status: false, message: error });
            }
        });
        
    

        socket.on('joinRoom', async (chatId) => {
            console.log('receive join room event');
            console.log(`joined a particular room ${chatId}`);
            socket.join(chatId);
        });
        socket.on('error', (error: any) => {
            console.error(`Socket error for client ${socket.id}:`, error);
        });

        socket.on('disconnect', () => {
            console.log("socket disconnected", socket.id)
        })

    });
    io.on('error', (error) => {
        console.log('error occure while connection socker', error)
    })

};

export default socketConnection;
