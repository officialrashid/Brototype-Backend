
import profileUpdate_Controller from "./profileUpdateController"
import getProfile_Controller from "./getProfileController"
export default (dependencies:any)=>{

    return{
        profileUpdateController: profileUpdate_Controller(dependencies),
        getProfileController: getProfile_Controller(dependencies)
    }
}