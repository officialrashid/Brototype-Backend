

import createChat_Controller from "./createChatController"
import sendMessage_Controller from "./sendMessageController"
import getAllChatRecipients_Controller from "./getAllChatRecipientsController"
export default (dependencies:any)=>{

    return{
        createChatController: createChat_Controller(dependencies),
        sendMessageController: sendMessage_Controller(dependencies),
        getAllChatRecipientsController: getAllChatRecipients_Controller(dependencies),
    
    }
}