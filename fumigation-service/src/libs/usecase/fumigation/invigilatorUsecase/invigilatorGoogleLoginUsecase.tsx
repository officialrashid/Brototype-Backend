

export const invigilatorGoogleLogin_Usecase = (dependencies: any) => {
    const {
       repository: { invigilatorRepository }
    } = dependencies;
 
    if (!invigilatorRepository) {
       return console.log("Error: Fumigation Repository not found");
    }
    const excutefunction = async (email:String) => {
     try{
      const response = await invigilatorRepository.invigilatorGoogleLogin(email);
      if (response.length>0) {
         return {status:true,response};
      }else{
        return {status:false,message:"email not found.you try signup"}
      }
     } catch(err){
      return{status:false,err:"An Error occurred while invigilatorLogin_Usecase"}
     }
      
    };
 
    return {
       excutefunction
    };
 };
 