

import createChat_Controller from "./createChatController"
import sendMessage_Controller from "./sendMessageController"
import getAllChatRecipients_Controller from "./getAllChatRecipientsController"
import getMessages_Controller from "./getMessagesController"
import storeChatAudio_Controller from "./storeChatAudioController"
import storeChatImage_Controller from "./storeChatImageController"
import storeChatVideo_Controller from "./storeChatVideoController"
export default (dependencies:any)=>{

    return{
        createChatController: createChat_Controller(dependencies),
        sendMessageController: sendMessage_Controller(dependencies),
        getAllChatRecipientsController: getAllChatRecipients_Controller(dependencies),
        getMessagesController: getMessages_Controller(dependencies),
        storeChatAudioController: storeChatAudio_Controller(dependencies),
        storeChatImageController: storeChatImage_Controller(dependencies),
        storeChatVideoController: storeChatVideo_Controller(dependencies),
    }
}