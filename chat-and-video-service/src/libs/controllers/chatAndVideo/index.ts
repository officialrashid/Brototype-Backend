
import createChat_Controller from "./createChatController"
import sendMessage_Controller from "./sendMessageController"
import getAllChatRecipients_Controller from "./getAllChatRecipientsController"
import getMessages_Controller from "./getMessagesController"
import storeChatAudio_Controller from "./storeChatAudioController"
import storeChatImage_Controller from "./storeChatImageController"
import storeChatVideo_Controller from "./storeChatVideoController"
import storeChatDocument_Controller from "./storeChatDocumentController"
import createGroupChat_Controller from "./createGroupChatController"
import getGroupMessages_Controller from "./getGroupMessagesController"
import getGroupMembers_Controller from "./getGroupMembersController"
import updateParticipantStatus_Controller from "./updateParticipantStatusController"
import updateGroupMembers_Controller from "./updateGroupMembersController"
import deleteMessage_Controller from "./deleteMessageController"
import getUnreadMsgCount_Controller from "./getUnreadMsgCountController"
import updateUnreadMsgZero_Controller from "./updateUnreadMsgZeroController"
import updateGroupUnreadMsgZero_Controller from "./updateGroupUnreadMsgZeroController"

export default (dependencies:any)=>{

    return{
        createChatController: createChat_Controller(dependencies),
        sendMessageController: sendMessage_Controller(dependencies),
        getAllChatRecipientsController: getAllChatRecipients_Controller(dependencies),
        getMessagesController: getMessages_Controller(dependencies),
        storeChatAudioController: storeChatAudio_Controller(dependencies),
        storeChatImageController: storeChatImage_Controller(dependencies),
        storeChatVideoController: storeChatVideo_Controller(dependencies),
        storeChatDocumentController: storeChatDocument_Controller(dependencies),
        createGroupChatController: createGroupChat_Controller(dependencies),
        getGroupMessagesController: getGroupMessages_Controller(dependencies),
        getGroupMembersController: getGroupMembers_Controller(dependencies),
        updateParticipantStatusController: updateParticipantStatus_Controller(dependencies),
        updateGroupMembersController: updateGroupMembers_Controller(dependencies),
        deleteMessageController: deleteMessage_Controller(dependencies),
        getUnreadMsgCountController: getUnreadMsgCount_Controller(dependencies),
        updateUnreadMsgZeroController: updateUnreadMsgZero_Controller(dependencies),
        updateGroupUnreadMsgZeroController: updateGroupUnreadMsgZero_Controller(dependencies),
    }
}