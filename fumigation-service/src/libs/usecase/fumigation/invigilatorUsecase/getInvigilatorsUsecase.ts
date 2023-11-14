
export const getInvigilators_Usecase = (dependencies: any) => {
    const {
       repository: { invigilatorRepository }
    } = dependencies;
 
    if (!invigilatorRepository) {
       return console.log("Error: Fumigation Repository not found");
    }
 
    const excutefunction = async (batchId:String) => {
    
       const response = await invigilatorRepository.getInvigilators();
 
       if (response) {
          console.log(response, "response coming in the ");
          return { response };
       }
    };
 
    return {
       excutefunction
    };
 };
 