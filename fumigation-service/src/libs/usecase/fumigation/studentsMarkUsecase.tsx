import fumigation from "../../controllers/fumigation";


export const studentsMark_Usecase = (dependencies: any) => {
   const {
      repository: { fumigationRepository }
   } = dependencies;

   if (!fumigationRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async (studentId: String, batchId: String, invigilatorId: string, type: String, startTime: String, endTime: String, theoryMark: Number, fumigationType: String) => {
      let isStatus:Boolean =false;
      var patternMark=0;
      var arrayMark=0;
      let oopsMark=0;
      let communicationMark=0;
      try {

         let mark;
         let durationInMinutes: number;
         if (type === 'Pattern' || type == 'Array') {
            console.log("keriiii");

            if (startTime && endTime) {
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

                     if (durationInMinutes) {
                        console.log(durationInMinutes, "duration minutes");
                     }
                     // First calculate the duration time and update the specified mark.
                     if (durationInMinutes <= 10) {
                        mark = 10;
                     }
                     else if (durationInMinutes <= 15 && durationInMinutes >= 11) {
                        mark = 9;
                     } else if (durationInMinutes <= 20 && durationInMinutes >= 16) {
                        mark = 7;
                     } else if (durationInMinutes >= 21) {
                        mark = 5;
                     } else {
                        mark = 0;
                     }
                     // end the update mark section.
                  }
               }
            } else {
               mark = 0
            }

         } else if (type === 'Oops' || type === 'Communication') {
            mark = theoryMark;
         }
         const markList = await fumigationRepository.updateStudentMark(studentId, batchId, invigilatorId, type, mark, fumigationType);
         // Check if any response item has Array or Pattern mark >= 5, or Oops mark >= 3, or Communication mark >= 5
         console.log(markList,"hghghvhvhhgvhgh");
         
        if(markList.length>0){
         console.log("markkkkkkkkkkk");
         
         markList.forEach((item:any) => {
           
          
            if (item?.examType === "Pattern") {
                patternMark = item?.mark
            }else if(item?.examType === 'Array'){
               arrayMark = item?.mark;
            }else if(item.examType === 'Oops'){
               oopsMark = item?.mark
            }else if(item?.examType === 'Communication'){
               communicationMark = item?.mark
            }
   
          });

        }
        if (patternMark >= 5 || arrayMark >= 5 ) {
         if(oopsMark >= 3 && communicationMark >= 5){
            console.log(patternMark,arrayMark,oopsMark,communicationMark,"||||||");
         
            console.log("eppozhum kerunnund");
            
            isStatus  = true;
            fumigationRepository.updateStudentsPassedOrFailed(studentId,batchId,isStatus,fumigationType) 
         }else{
            if(patternMark>0&&arrayMark>0&&oopsMark>0&&communicationMark>0){
               fumigationRepository.updateStudentsPassedOrFailed(studentId,batchId,isStatus,fumigationType) 
            }
           
         }
       }else{
         if(patternMark>0&&arrayMark>0&&oopsMark>0&&communicationMark>0){
            fumigationRepository.updateStudentsPassedOrFailed(studentId,batchId,isStatus,fumigationType) 
         }
        
      }
       
          
      return {status:true,message:"mark update successfully"}

      } catch (error) {
         console.log(error, "error in the student Mark update usecase");
   
      }
    
}
return {
   excutefunction
}
}
