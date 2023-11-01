

export const studentsMark_Usecase = (dependencies: any) => {
   const {
      repository: { fumigationRepository }
   } = dependencies;

   if (!fumigationRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async (studentId: String, batchId: String, type: String, startTime: String, endTime: String) => {
      try {

         let mark;
         let durationInMinutes: number;
         if (type === 'Pattern' || type == 'Array') {

            const currentDate = new Date();      // Get the current date and time.

            const startComponents = startTime.match(/(\d+):(\d+)\s*(am|pm)/i); // Parse the provided start time (e.g., "10:00 am").
            if (startComponents) {

               let startHour = parseInt(startComponents[1]);
               const startMinute = parseInt(startComponents[2]);     // Extract hour, minute, and meridian (am/pm) for the start time.
               const startMeridian = startComponents[3].toLowerCase()

               if (startMeridian === 'pm' && startHour < 12) {
                  startHour += 12;        // Convert the start time to 24-hour format.
               }

               currentDate.setHours(startHour, startMinute, 0, 0);  // Set the start time components on the current date.


               const endComponents = endTime.match(/(\d+):(\d+)\s*(am|pm)/i);  // Parse the provided end time.

               if (endComponents) {

                  let endHour = parseInt(endComponents[1]);
                  const endMinute = parseInt(endComponents[2]);   // Extract hour, minute, and meridian (am/pm) for the end time.
                  const endMeridian = endComponents[3].toLowerCase();

                  if (endMeridian === 'pm' && endHour < 12) {
                     endHour += 12;                 // Convert the end time to 24-hour format.
                  }

                  const endTimeDate = new Date(currentDate);
                  endTimeDate.setHours(endHour, endMinute, 0, 0);   // Create a Date object for the end time.

                  // Calculate the duration in minutes between the current time and the end time.
                  durationInMinutes = Math.floor((endTimeDate.getTime() - currentDate.getTime()) / (1000 * 60));

                  // First calculate the duration time and update the specified mark.
                  if (durationInMinutes <= 5) {
                     mark = 10;
                  }
                  else if (durationInMinutes <= 10 && durationInMinutes >= 6) {
                     mark = 9;
                  } else if (durationInMinutes <= 15 && durationInMinutes >= 11) {
                     mark = 8;
                  } else if (durationInMinutes <= 20 && durationInMinutes >= 16) {
                     mark = 7;
                  } else if (durationInMinutes <= 25 && durationInMinutes >= 21) {
                     mark = 6;
                  } else if (durationInMinutes <= 30 && durationInMinutes >= 26) {
                     mark = 5;
                  } else {
                     mark = 0;
                  }
                  // end the update mark section.
               }
            }
         }
         const response = await fumigationRepository.updateStudentMark(studentId, batchId, type, mark);
         if (response) {
            return { response };
         }
      } catch (error) {
         console.log(error, "error in the student Mark update usecase");

      }

      return {
         excutefunction
      }

   }
}
