import express, { Router, Request, Response } from "express";
import { chatAndVideo_Controller } from "../../libs/controllers";
import multer, { memoryStorage } from 'multer';

const storage = memoryStorage();
const upload = multer({ storage });

export default (dependencies: any): Router => {
    const router = express.Router();
    const { createChatController, sendMessageController, getAllChatRecipientsController, getMessagesController, storeChatAudioController,storeChatImageController } = chatAndVideo_Controller(dependencies);

    router.post('/create-chat', createChatController);
    router.post('/send-message', sendMessageController);
    router.get('/get-all-chat-recipients/:initiatorId', getAllChatRecipientsController);
    router.get('/get-messages', getMessagesController);
    router.post('/store-chat-audio',upload.single('audio'),storeChatAudioController);
    router.post('/store-chat-image',upload.single('image'),storeChatImageController);
    router.post('/store-chat-video',upload.single('video'),storeChatImageController);
    return router;
};
