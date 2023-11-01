import { Enquiry } from "../../entities/ enqueries";


export const fumigation_Usecase = (dependencies: any) => {
   console.log("old fumigationbuecaseeee");
   
   const {
      repository: { fumigationRepository }
   } = dependencies;

   if (!fumigationRepository) {
      return console.log("Error: Fumigation Repository not found");
   }

   const excutefunction = async (name: string, email: string, phone: string, qualification: string, preferredLocation: string) => {
      const data = {
         name,
         email,
         phone,
         qualification,
         preferredLocation
      };
      const enquery = new Enquiry(data)
      const response = await fumigationRepository.Enqueries(enquery);

      if (response) {
         console.log(response, "response coming in the usecase");
         return { status: true, response };
      }
   };

   return {
      excutefunction
   };
};
