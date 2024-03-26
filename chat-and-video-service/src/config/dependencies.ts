import { chatAndVideoRepository} from '../libs/app/repository/index'
import {createChat_Usecase,sendMessage_Usecase,getAllChatRecipients_Usecase,getMessages_Usecase,storeChatAudio_Usecase,storeChatImage_Usecase,storeChatVideo_Usecase,storeChatDocument_Usecase,createGroupChat_Usecase,sendGroupMessage_Usecase,getGroupMessages_Usecase} from '../libs/usecase';

const useCase:any = {

   createChat_Usecase,
   sendMessage_Usecase,
   getAllChatRecipients_Usecase,
   getMessages_Usecase,
   storeChatAudio_Usecase,
   storeChatImage_Usecase,
   storeChatVideo_Usecase,
   storeChatDocument_Usecase,
   createGroupChat_Usecase,
   sendGroupMessage_Usecase,
   getGroupMessages_Usecase

};
const repository:any={chatAndVideoRepository}
export default {useCase,repository }