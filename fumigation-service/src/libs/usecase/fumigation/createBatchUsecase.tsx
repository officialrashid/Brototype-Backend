import { Batches } from "../../entities/batches"

export const createBatch_Usecase = (dependencies: any) => {
   const {
      repository: { fumigationRepository }
   } = dependencies;

   if (!fumigationRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async (batchName: String, hubLocation: String) => {
      const data = {
         batchName,
         hubLocation
      };
      const batchNameExist = await fumigationRepository.batchNameExist(batchName);
      if (batchNameExist.length > 0) {
         return { status: false, message: "batchName already in use" };
      } else {
         const Batch = new Batches(data)
         const response = await fumigationRepository.createBatch(Batch);
         if (response) {
            return { status: true, response };
         }
      }

   };

   return {
      excutefunction
   };
};
