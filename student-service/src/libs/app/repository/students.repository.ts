import schema from "../dataBase/schema"


export default {

    profileUpdate: async (profileData: any) => {
        try {
            const response = await schema.Manifest.create(profileData) //create the Enquerie Studnets
            return response;
          } catch (err) {
            console.log(err, "error in the Enqueries repository function");
          }
      
        }, 
    getProfile : async (studentId:string) =>{
      console.log(studentId,"studentId coming or not check log");
         try {
           const response = await schema.Manifest.find({studentId:studentId})
           return response
         } catch (err){
         
         }
    }    
    }
