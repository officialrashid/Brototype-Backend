
export const getAllPendingStudents_Usecase = (dependencies: any) => {
   const {
      repository: { studentRepository }
   } = dependencies;

   if (!studentRepository) {
      return console.log("Error: Fumigation Repository not found");
   }

   const excutefunction = async () => {
     console.log("use case ethiiiii makkaleeeeeee");
     
      const response = await studentRepository.getAllPendingStudents();

      if (response) {
         console.log(response, "response coming in the ");
         return { response };
      }
   };

   return {
      excutefunction
   };
};
