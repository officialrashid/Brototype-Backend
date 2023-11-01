import { Enquiry } from "../../entities/ enqueries";


export const getAllPendingStudents_Usecase = (dependencies: any) => {
   const {
      repository: { fumigationRepository }
   } = dependencies;

   if (!fumigationRepository) {
      return console.log("Error: Fumigation Repository not found");
   }

   const excutefunction = async () => {
     console.log("use case ethiiiii makkaleeeeeee");
     
      const response = await fumigationRepository.getAllPendingStudents();

      if (response) {
         console.log(response, "response coming in the ");
         return { response };
      }
   };

   return {
      excutefunction
   };
};
