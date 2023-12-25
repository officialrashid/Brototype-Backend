import fumigation from "../../../controllers/fumigation";

// Exporting a function that returns an object containing the execute function
export const studentsMark_Usecase = (dependencies: any) => {
   const {
      repository: { studentRepository }
   } = dependencies;

   try {
      // Check if studentRepository is available
      if (!studentRepository) {
         throw new Error("Fumigation Repository not found");
      }

      // Define the execute function with parameters
      const excutefunction = async (studentId: String, batchId: String, invigilatorId: string, type: String, startTime: String, endTime: String, theoryMark: Number, fumigationType: String) => {
         // Initialize variables for marks and status
         let isStatus: Boolean = false;
         var patternMark = 0;
         var arrayMark = 0;
         let oopsMark = 0;
         let communicationMark = 0;

         try {
            let mark;
            let durationInMinutes: number;

            // Check the exam type (Pattern or Array)
            if (type === 'Pattern' || type == 'Array') {
               // Check if start and end time are provided
               if (startTime && endTime) {
                  const currentDate = new Date();

                  // Parse start time
                  const startComponents = startTime.match(/(\d+):(\d+)\s*(am|pm)/i);
                  if (startComponents) {
                     let startHour = parseInt(startComponents[1]);
                     const startMinute = parseInt(startComponents[2]);
                     const startMeridian = startComponents[3].toLowerCase();

                     // Convert start time to 24-hour format
                     if (startMeridian === 'pm' && startHour < 12) {
                        startHour += 12;
                     }

                     currentDate.setHours(startHour, startMinute, 0, 0);

                     // Parse end time
                     const endComponents = endTime.match(/(\d+):(\d+)\s*(am|pm)/i);

                     if (endComponents) {
                        let endHour = parseInt(endComponents[1]);
                        const endMinute = parseInt(endComponents[2]);
                        const endMeridian = endComponents[3].toLowerCase();

                        // Convert end time to 24-hour format
                        if (endMeridian === 'pm' && endHour < 12) {
                           endHour += 12;
                        }

                        const endTimeDate = new Date(currentDate);
                        endTimeDate.setHours(endHour, endMinute, 0, 0);

                        // Calculate the duration in minutes
                        durationInMinutes = Math.floor((endTimeDate.getTime() - currentDate.getTime()) / (1000 * 60));

                        if (durationInMinutes) {
                           console.log(durationInMinutes, "duration minutes");
                        }

                        // Assign marks based on the duration
                        if (durationInMinutes <= 10) {
                           mark = 10;
                        } else if (durationInMinutes <= 15 && durationInMinutes >= 11) {
                           mark = 9;
                        } else if (durationInMinutes <= 20 && durationInMinutes >= 16) {
                           mark = 7;
                        } else if (durationInMinutes >= 21) {
                           mark = 5;
                        } else {
                           mark = 0;
                        }
                     }
                  }
               } else {
                  mark = 0;
               }
            } else if (type === 'Oops' || type === 'Communication') {
               // For Oops and Communication, use the theory mark
               mark = theoryMark;
            }

            // Update student marks in the repository
            const markList = await studentRepository.updateStudentMark(studentId,batchId,invigilatorId,type,startTime,endTime,mark,fumigationType);
            if (markList.length > 0) {
               // Extract marks for different exam types
               markList.forEach((item: any) => {
                  if (item?.examType === "Pattern") {
                     patternMark = item?.mark;
                  } else if (item?.examType === 'Array') {
                     arrayMark = item?.mark;
                  } else if (item.examType === 'Oops') {
                     oopsMark = item?.mark;
                  } else if (item?.examType === 'Communication') {
                     communicationMark = item?.mark;
                  }
               });
            }

            // Check conditions for passing or failing
            if (patternMark >= 5 || arrayMark >= 5) {
               if (oopsMark >= 3 && communicationMark >= 5) {
                  isStatus = true;
                  studentRepository.updateStudentsPassedOrFailed(studentId, batchId, isStatus, fumigationType);
               } else {
                  if (patternMark > 0 && arrayMark > 0 && oopsMark > 0 && communicationMark > 0) {
                     studentRepository.updateStudentsPassedOrFailed(studentId, batchId, isStatus, fumigationType);
                  }
               }
            } else {
               if (patternMark > 0 && arrayMark > 0 && oopsMark > 0 && communicationMark > 0) {
                  studentRepository.updateStudentsPassedOrFailed(studentId, batchId, isStatus, fumigationType);
               }
            }

            // Return success message
            return { status: true, message: "mark update successfully" };
         } catch (error) {
            // Handle errors during mark update
            console.log(error, "error in the student Mark update usecase");
            throw new Error("Error updating student mark");
         }
      };

      // Return the execute function
      return {
         excutefunction
      };
   } catch (error) {
      // Handle errors in initializing the use case
      return {status:false,err:"An Error occured while student Mark Usecase"}
      // Handle the error or rethrow it if needed
   }
};