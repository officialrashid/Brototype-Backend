
import profileUpdate_Controller from "./profileUpdateController"
import getProfile_Controller from "./getProfileController"
import patchProfile_Controller from "./patchProfileController"
import getChatAllSuperleads_Controller from "./getChatAllSuperleadsController"
export default (dependencies:any)=>{

    return{
        profileUpdateController: profileUpdate_Controller(dependencies),
        getProfileController: getProfile_Controller(dependencies),
        patchProfileController: patchProfile_Controller(dependencies),
        getChatAllSuperleadsController: getChatAllSuperleads_Controller(dependencies),
    }
}