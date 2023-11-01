
export const getBatchwiseStudents_Usecase = (dependencies: any) => {
   const {
      repository: { fumigationRepository }
   } = dependencies;

   if (!fumigationRepository) {
      return console.log("Error: Fumigation Repository not found");
   }

   const excutefunction = async (batchId:String) => {
   
      const response = await fumigationRepository.getBatchwiseStudents(batchId);

      if (response) {
         console.log(response, "response coming in the ");
         return { response };
      }
   };

   return {
      excutefunction
   };
};
