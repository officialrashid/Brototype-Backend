import {Batches} from "../../entities/batches"

export const editInvigilator_Usecase = (dependencies: any) => {
   const {
      repository: { fumigationRepository }
   } = dependencies;

   if (!fumigationRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async (invigilatorId:string) => {
      const response = await fumigationRepository.editInvigilator(invigilatorId);
      if (response) {
         console.log(response);
         
         return {status:true,response };
      }
   };

   return {
      excutefunction
   };
};
