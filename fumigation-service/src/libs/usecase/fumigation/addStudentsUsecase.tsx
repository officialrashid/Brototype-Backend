

export const addStudents_Usecase = (dependencies: any) => {
   const {
      repository: { fumigationRepository }
   } = dependencies;

   if (!fumigationRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async (studentId:String,batchId:String) => {
   
      const response = await fumigationRepository.addStudents(studentId,batchId);
      if (response) {
         return {response};
      }
   };

   return {
      excutefunction
   };
};
