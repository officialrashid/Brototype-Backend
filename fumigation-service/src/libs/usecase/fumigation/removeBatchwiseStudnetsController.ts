import {Batches} from "../../entities/batches"

export const removeBatchwiseStudents_Usecase = (dependencies: any) => {
   const {
      repository: { fumigationRepository }
   } = dependencies;

   if (!fumigationRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async (studentId:string,batchId:string) => {
      const response = await fumigationRepository.removeBatchwiseStudents(studentId,batchId);
      if (response) {
         return {status:true,response };
      }
   };

   return {
      excutefunction
   };
};
