import { Server } from "socket.io";
import { sendMessage_Usecase } from "../libs/usecase/chatAndVideo/sendMessageUsecase";

const socketConnection = async (server: any) => {
    const io = new Server(server, { cors: { origin: "*" } });

    io.on('connection', (socket) => {
        console.log("Socket connection successfully");

        socket.on('message', async (data) => {
            try {
                const { senderId, receiverId, content } = data;
                const response = await sendMessage_Usecase(senderId, receiverId, content);

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
