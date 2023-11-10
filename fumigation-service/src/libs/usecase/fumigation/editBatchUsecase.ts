import {Batches} from "../../entities/batches"

export const editBatch_Usecase = (dependencies: any) => {
   const {
      repository: { fumigationRepository }
   } = dependencies;

   if (!fumigationRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async (batchId:string) => {
      const response = await fumigationRepository.editBatch(batchId);
      if (response) {
         console.log(response,":::::::");
         
         return {response };
      }
   };

   return {
      excutefunction
   };
};
