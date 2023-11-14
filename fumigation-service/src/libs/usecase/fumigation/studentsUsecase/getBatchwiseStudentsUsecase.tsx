
export const getBatchwiseStudents_Usecase = (dependencies: any) => {
   const {
      repository: { studentRepository }
   } = dependencies;

   if (!studentRepository) {
      return console.log("Error: Fumigation Repository not found");
   }

   const excutefunction = async (batchId:String) => {
   
      const response = await studentRepository.getBatchwiseStudents(batchId);

      if (response) {
         console.log(response, "response coming in the ");
         return { response };
      }
   };

   return {
      excutefunction
   };
};
