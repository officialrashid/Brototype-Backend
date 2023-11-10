import {Batches} from "../../entities/batches"

export const getAllBatch_Usecase = (dependencies: any) => {
   const {
      repository: { fumigationRepository }
   } = dependencies;

   if (!fumigationRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async () => {
      const response = await fumigationRepository.getAllBatches();
      if (response) {
         return {status:true,response };
      }
   };

   return {
      excutefunction
   };
};
