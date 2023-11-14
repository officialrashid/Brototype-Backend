

export const removeBatchwiseStudents_Usecase = (dependencies: any) => {
   const {
      repository: { studentRepository }
   } = dependencies;

   if (!studentRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async (studentId:string,batchId:string) => {
      const response = await studentRepository.removeBatchwiseStudents(studentId,batchId);
      if (response) {
         return {status:true,response };
      }
   };

   return {
      excutefunction
   };
};
