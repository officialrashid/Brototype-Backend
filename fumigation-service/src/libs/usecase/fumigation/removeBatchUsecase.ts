import {Batches} from "../../entities/batches"

export const removeBatch_Usecase = (dependencies: any) => {
   const {
      repository: { fumigationRepository }
   } = dependencies;

   if (!fumigationRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async (batchId:string) => {
      const response = await fumigationRepository.removeBatch(batchId);
      if (response) {
         return {status:true,response };
      }
   };

   return {
      excutefunction
   };
};
