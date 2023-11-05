

export const invigilatorLogin_Usecase = (dependencies: any) => {
    const {
       repository: { fumigationRepository }
    } = dependencies;
 
    if (!fumigationRepository) {
       return console.log("Error: Fumigation Repository not found");
    }
    const excutefunction = async (name:String,email:String) => {
    
       const response = await fumigationRepository.invigilatorLogin(name,email);
       if (response) {
          return {response};
       }
    };
 
    return {
       excutefunction
    };
 };
 