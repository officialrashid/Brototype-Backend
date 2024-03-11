// socketConnection.js
import { Server } from "socket.io";
import {sendMessage_Usecase} from "../libs/usecase/chatAndVideo/sendMessageUsecase"
    const socketConnection = async (server: any) => {
        console.log();
        
        const io = new Server(server, {cors: {origin: "*",}})
        io.on('connection', (socket) => {
            console.log("socket connection successfullyy");
            
            socket.emit('connect', { message: 'A new client connected' },socket.id);

            // Incoming messages
            socket.on('message', async (data: any) => {
                try {
                    const { senderId, receiverId, content } = data;
                    const response = await sendMessage_Usecase(senderId, receiverId, content);

                    if (response.status === true && response.sendMessage.chatId) {
                        const roomId = response.sendMessage.chatId.toString();
                        const payload = {
                            chatId: roomId,
                            content: response.sendMessage.message
                        };

                        // Emit message to all clients in the room
                        io.to(roomId).emit("received", payload);

                        // Broadcast notification to all clients except the sender
                        socket.broadcast.emit("notification", { message: "New message received" });
                    } else {
                        console.error("Failed to send message:", response.message);
                    }
                } catch (error) {
                    console.error("Error processing message:", error);
                }
            });
        });
       
    };
    export default socketConnection;
   

