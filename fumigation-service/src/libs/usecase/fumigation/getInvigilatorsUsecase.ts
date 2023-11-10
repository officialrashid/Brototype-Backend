
export const getInvigilators_Usecase = (dependencies: any) => {
    const {
       repository: { fumigationRepository }
    } = dependencies;
 
    if (!fumigationRepository) {
       return console.log("Error: Fumigation Repository not found");
    }
 
    const excutefunction = async (batchId:String) => {
    
       const response = await fumigationRepository.getInvigilators();
 
       if (response) {
          console.log(response, "response coming in the ");
          return { response };
       }
    };
 
    return {
       excutefunction
    };
 };
 