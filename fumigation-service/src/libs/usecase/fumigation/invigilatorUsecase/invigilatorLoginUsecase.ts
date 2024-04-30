

export const invigilatorLogin_Usecase = (dependencies: any) => {
    const {
       repository: { invigilatorRepository }
    } = dependencies;
 
    if (!invigilatorRepository) {
       return console.log("Error: Fumigation Repository not found");
    }
    const excutefunction = async (uniqueId:String) => {
     try{
      console.log(uniqueId,"llll&&^^^%%%%%%%%");
      
      const response = await invigilatorRepository.invigilatorLogin(uniqueId);
      if (response) {
         return {response};
      }
     } catch(err){
      return{status:false,err:"An Error occurred while invigilatorLogin_Usecase"}
     }
      
    };
 
    return {
       excutefunction
    };
 };
 