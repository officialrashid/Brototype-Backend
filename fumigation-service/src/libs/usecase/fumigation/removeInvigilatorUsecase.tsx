import {Batches} from "../../entities/batches"

export const removeInvigilator_Usecase = (dependencies: any) => {
   const {
      repository: { fumigationRepository }
   } = dependencies;

   if (!fumigationRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async (invigilatorId:string) => {
      const response = await fumigationRepository.removeInvigilator(invigilatorId);
      if (response) {
         return {status:true,message:"invigilator remove successfully" };
      }
   };

   return {
      excutefunction
   };
};
