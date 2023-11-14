

export const removeInvigilator_Usecase = (dependencies: any) => {
   const {
      repository: { invigilatorRepository }
   } = dependencies;

   if (!invigilatorRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async (invigilatorId:string) => {
      const response = await invigilatorRepository.removeInvigilator(invigilatorId);
      if (response) {
         return {status:true,message:"invigilator remove successfully" };
      }
   };

   return {
      excutefunction
   };
};
