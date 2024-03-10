

import createChat_Controller from "./createChatController"

export default (dependencies:any)=>{

    return{
        createChatController: createChat_Controller(dependencies),
        
    
    }
}