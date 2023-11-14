

export const addStudents_Usecase = (dependencies: any) => {
   const {
      repository: { studentRepository }
   } = dependencies;

   if (!studentRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async (studentId:String,batchId:String) => {
   
      const response = await studentRepository.addStudents(studentId,batchId);
      if (response) {
         return {response};
      }
   };

   return {
      excutefunction
   };
};
