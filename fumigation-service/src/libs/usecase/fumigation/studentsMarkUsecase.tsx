

export const studentsMark_Usecase = (dependencies: any) => {
    const {
       repository: { fumigationRepository }
    } = dependencies;
 
    if (!fumigationRepository) {
       return console.log("Error: Fumigation Repository not found");
    }
    const excutefunction = async (type:String,startTime:String,endTime:String) => {
      let durationInMinutes: number;
      if (type === 'Pattern' || type == 'Array') {
        // Get the current date and time.
        const currentDate = new Date();
        // Parse the provided start time (e.g., "10:00 am").
        const startComponents = startTime.match(/(\d+):(\d+)\s*(am|pm)/i);
        if (startComponents) {
          // Extract hour, minute, and meridian (am/pm) for the start time.
          let startHour = parseInt(startComponents[1]);
          const startMinute = parseInt(startComponents[2]);
          const startMeridian = startComponents[3].toLowerCase()
          // Convert the start time to 24-hour format.
          if (startMeridian === 'pm' && startHour < 12) {
            startHour += 12;
          }
          // Set the start time components on the current date.
          currentDate.setHours(startHour, startMinute, 0, 0);
    
          // Parse the provided end time.
          const endComponents = endTime.match(/(\d+):(\d+)\s*(am|pm)/i);
    
          if (endComponents) {
            // Extract hour, minute, and meridian (am/pm) for the end time.
            let endHour = parseInt(endComponents[1]);
            const endMinute = parseInt(endComponents[2]);
            const endMeridian = endComponents[3].toLowerCase();
    
            // Convert the end time to 24-hour format.
            if (endMeridian === 'pm' && endHour < 12) {
              endHour += 12;
            }
    
            // Create a Date object for the end time.
            const endTimeDate = new Date(currentDate);
            endTimeDate.setHours(endHour, endMinute, 0, 0);
    
            // Calculate the duration in minutes between the current time and the end time.
            durationInMinutes = Math.floor((endTimeDate.getTime() - currentDate.getTime()) / (1000 * 60));
            console.log(durationInMinutes, "{}{}{}{}+++++++++++++++");
          }
        }
      }
       const response = await fumigationRepository.addStudentsMark();
       if (response) {
          return {response};
       }
    };
 
    return {
       excutefunction
    };
 };
 