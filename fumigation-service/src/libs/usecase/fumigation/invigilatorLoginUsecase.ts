

export const invigilatorLogin_Usecase = (dependencies: any) => {
    const {
       repository: { fumigationRepository }
    } = dependencies;
 
    if (!fumigationRepository) {
       return console.log("Error: Fumigation Repository not found");
    }
    const excutefunction = async (uniqueId:String) => {
    
       const response = await fumigationRepository.invigilatorLogin(uniqueId);
       if (response) {
          return {response};
       }
    };
 
    return {
       excutefunction
    };
 };
 