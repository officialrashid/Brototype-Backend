import { Enquiry } from "../../entities/ enqueries";

// This is Enquerie Students usecase .
export const fumigation_Usecase = (dependencies: any) => {
   const {
      repository: { fumigationRepository }
   } = dependencies;

   if (!fumigationRepository) {
      return console.log("Error: Fumigation Repository not found");
   }

   const excutefunction = async (name: string, email: string, phone: Number, qualification: string, prefferredLocation: string) => {
      const data = {
         name,
         email,
         phone,
         qualification,
         prefferredLocation
      };
      const enquery = new Enquiry(data) //pass all data in enities
      const response = await fumigationRepository.Enqueries(enquery); // call function define the repository

      if (response) {
         return { status: true, response }; // handle response .
      }
   };

   return {
      excutefunction
   };
};
