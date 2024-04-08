import express, { Router, Request, Response } from "express";
import { chatAndVideo_Controller } from "../../libs/controllers";
import multer, { memoryStorage } from 'multer';

const storage = memoryStorage();
const upload = multer({ storage });

export default (dependencies: any): Router => {
    const router = express.Router();
    const { createChatController, sendMessageController, getAllChatRecipientsController, getMessagesController, storeChatAudioController,storeChatImageController,createGroupChatController,getGroupMessagesController,getGroupMembersController,updateParticipantStatusController,updateGroupMembersController,deleteMessageController,getUnreadMsgCountController,updateUnreadMsgZeroController,updateGroupUnreadMsgZeroController } = chatAndVideo_Controller(dependencies);

    router.post('/create-chat', createChatController);
    router.post('/send-message', sendMessageController);
    router.get('/get-all-chat-recipients/:initiatorId', getAllChatRecipientsController);
    router.get('/get-messages', getMessagesController);
    router.post('/store-chat-audio',upload.single('audio'),storeChatAudioController);
    router.post('/store-chat-image',upload.single('image'),storeChatImageController);
    router.post('/store-chat-video',upload.single('video'),storeChatImageController);
    router.post('/store-chat-document',upload.single('document'),storeChatImageController);
    router.post('/create-group-chat',upload.single('groupChatProfile'),createGroupChatController);
    router.get('/get-group-messages', getGroupMessagesController);
    router.get('/get-group-members-details/:groupId',getGroupMembersController);
    router.patch('/update-group-participant-status',updateParticipantStatusController);
    router.patch('/update-group-members',updateGroupMembersController);
    router.delete('/delete-message',deleteMessageController);
    router.delete('/get-unread-message-count',deleteMessageController);
    router.get('/get-unread-message-count/:initiatorId', getUnreadMsgCountController);
    router.patch('/update-unread-msg-zero', updateUnreadMsgZeroController);
    router.patch('/update-group-unread-msg-zero', updateGroupUnreadMsgZeroController);
    return router;
};
