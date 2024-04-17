import { callbackPromise } from "nodemailer/lib/shared";
import schema from "../dataBase/schema"
import reviewer from "../../controllers/reviewer";
import moment from "moment";
import { String } from "aws-sdk/clients/acm";



export default {

  scheduleEventExist: async (reviewerId: any, startTime: moment.MomentInput, endTime: moment.MomentInput, day: any, date: string[]) => {
    try {
        // Parse the incoming start and end times into moment objects
        const start = moment(startTime, 'hh:mma');
        const end = moment(endTime, 'hh:mma');

        // Query to find overlapping events
        const existingEvents: any = await schema.Events.find({
            reviewerId: reviewerId,
        });

        // Loop through existing events to check for overlaps
        if (existingEvents.length > 0) {
            for (const eventData of existingEvents[0].events) {
                // Check if any of the dates in the date array are included in eventData.date
                if (date.some(d => eventData.date.includes(d))) {
                    console.log("matcheddd");

                    // Parse existing event start and end times into moment objects
                    const existingStart = moment(eventData.startTime, 'hh:mma');
                    const existingEnd = moment(eventData.endTime, 'hh:mma');

                    // Check for overlap
                    if (
                        (start.isSameOrBefore(existingEnd) && end.isSameOrAfter(existingStart)) ||
                        (existingStart.isSameOrBefore(end) && existingEnd.isSameOrAfter(start))
                    ) {
                        // There is an overlap, return false
                        return { status: false };
                    }
                }
            }

            // No overlaps found, return true
            return { status: true };
        } else {
            return { status: true };
        }
    } catch (err) {
        console.log(err, "error in the scheduleEventExist check function");
        throw err;
    }
},

scheduleEvents: async (data: any) => {
    if (!data) {
      return { status: false, message: "Data is missing" };
    }

    const { reviewerId, startTime, endTime, label, day, id, studentId, advisorId, booked, status, date,customType } = data;

    try {
      // Check if a document with the given reviewerId exists
      const existingDocument = await schema.Events.findOne({ reviewerId });

      if (existingDocument) {
        existingDocument.events.push({
          id,
          startTime,
          endTime,
          label,
          day,
          date,
          customType,
          bookedEvents: [],
          weekly: [],
          monthly: [],
          specifDays: []
        });

        // Save the updated document
        const response = await existingDocument.save();
        return response;

      } else {
        // If the document doesn't exist, create a new one with the reviewerId and the new event
        const newDocument = await schema.Events.create({
          reviewerId,
          events: [
            {
              id,
              startTime,
              endTime,
              label,
              day,
              date,
              customType,
              bookedEvents: [

              ],
              weekly: [],
              monthly: [],
              specifDays: []
            },
          ],
        });

        return newDocument;
      }
    } catch (err) {
      console.error(err, "Error in creating/updating events");
      throw err;
    }
  },
  getScheduleEvents: async (reviewerId: string) => {
    try {
      const response = await schema.Events.find({ reviewerId: reviewerId })
      return response;

    } catch (error) {
      return { status: false, message: error }
    }
  },
  updateScheduleEvents: async (data: any) => {


    const { reviewerId, startTime, endTime, label, day, id } = data;

    try {
      // Assuming you are using MongoDB, use the appropriate method to update the document based on both reviewerId and event ID
      const response = await schema.Events.updateMany(
        { reviewerId, "events.id": id }, // Match based on both reviewerId and event ID
        {
          $set: {
            "events.$.startTime": startTime,
            "events.$.endTime": endTime,
            "events.$.label": label,
            "events.$.day": day
          }
        }
      );

      // Handle the response accordingly


      return { status: true, message: "Event updated successfully" };
    } catch (error) {
      console.error("Error updating event:", error);
      return { status: false, message: error };
    }
  },
  deleteScheduleEvents: async (data: any) => {
    console.log(data, "delete data coming backend");

    try {
      const { reviewerId, id } = data;
      console.log(id, "id coming for delete api");

      const response = await schema.Events.updateOne(
        { reviewerId, "events.id": id },
        { $pull: { events: { id } } }
      );

      if (response) {
        return { status: true, message: "Event deleted successfully" };
      } else {
        return { status: false, message: "Event not found or not deleted" };
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      return { status: false, message: error };
    }
  },
  getTimeLineUp: async (reviewerId: string, day: string) => {
    console.log(day, "pppppppp");

    try {


      const reviewer = await schema.Events.findOne({ reviewerId })
      if (!reviewer) {
        return { status: false, messsage: "reviewer not found" }
      }



      return reviewer.events;
    } catch (error) {
      return { status: false, message: "Error in the get TimeLine up" };
    }
  },
  getAllDetails: async (reviewerId: string) => {
    try {
      const response = await schema.Events.find({ reviewerId: reviewerId })
      return response;
    } catch (error) {
      return { status: false, message: "Error in the get all details " }
    }
  },
  profileUpdate: async (profileData: { reviewerId: any; imageUrl: any; firstName: any; lastName: any; email: any; phone: any; age: string; gender: string }) => {
    try {
      // Check if the profile with the given studentId exists
      const existingProfile = await schema.Profile.findOne({
        reviewerId: profileData.reviewerId
      });

      if (existingProfile) {
        // If profile exists, update specific fields with the new data
        const updatedProfile = await schema.Profile.findOneAndUpdate(
          { reviewerId: profileData.reviewerId },
          {
            $set: {
              imageUrl: profileData.imageUrl || existingProfile.imageUrl,
              firstName: profileData.firstName || existingProfile.firstName,
              lastName: profileData.lastName || existingProfile.lastName,
              email: profileData.email || existingProfile.email,
              phone: profileData.phone || existingProfile.phone,
              age: profileData.age || existingProfile.age,
              gender: profileData.gender || existingProfile.gender,
              // Add other fields here if needed
            }
          },
          { new: true }
        );

        return updatedProfile;
      } else {
        // If profile doesn't exist, create a new profile
        const newProfile = await schema.Profile.create(profileData);
        return newProfile;
      }
    } catch (err) {
      console.log(err, "error in the Enqueries repository function");
    }
  },

  updateWorkDetails: async (data: any, reviewerId: string) => {
    try {

      const existingProfile = await schema.Profile.findOne({ reviewerId: reviewerId });
      if (existingProfile) {
        // If the profile exists, update it with the provided data
        const updatedProfile = await schema.Profile.findOneAndUpdate(
          { reviewerId: reviewerId },
          data,
          { new: true }
        );

        return updatedProfile;
      } else {
        // If the profile doesn't exist, create a new one
        const newProfile = await schema.Profile.create({
          ...data,
          reviewerId: reviewerId
        });

        return newProfile;
      }

    } catch (err) {
      return { status: false, message: "Error in the update education details" }
    }
  },
  getProfile: async (reviewerId: string) => {
    try {
      const response = await schema.Profile.find({ reviewerId: reviewerId })
      return response
    } catch (error) {
      return { status: false, message: "some issue in get profile" }
    }
  },
  getReviewTakeCount: async (reviewerId: string) => {
    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
  
      // Find the reviewer document by reviewerId
      const reviewer = await schema.Events.findOne({ reviewerId });
  
      if (!reviewer) {
        return { status: false, message: "Reviewer not found" };
      }
  
      const monthCounts: { [key: string]: number } = {};
  
      // Initialize monthCounts with counts for all months set to 0
      for (let month = 1; month <= 12; month++) {
        monthCounts[month.toString().padStart(2, '0')] = 0;
      }
  
      // Iterate through each event
      reviewer.events.forEach((event: any) => {
        // Iterate through each booked event
        event.bookedEvents.forEach((bookedEvent: any) => {
          // Extract year and month from the event's date
          const dateParts = bookedEvent.date.split("-");
          const year = parseInt(dateParts[2]);
          const month = parseInt(dateParts[1]);
  
          // Check if the event is from the current year
          if (year === currentYear) {
            // Count booked events with status=true for each month
            const count = bookedEvent.booked === true && bookedEvent.status === true ? 1 : 0;
  
            // Add the count to the respective month in monthCounts
            monthCounts[month.toString().padStart(2, '0')] += count;
          }
        });
      });
  
      // Convert monthCounts to an array of objects [{ month, count }]
      const countsArray = Object.entries(monthCounts).map(([month, count]) => ({ month, count }));
  
      // Sort the countsArray based on the month
      countsArray.sort((a, b) => parseInt(a.month) - parseInt(b.month));
  
      // Extract only the counts from the sorted array
      const sortedCounts   = await countsArray.map(({ count }) => count);
      console.log(sortedCounts,"await await");
      
      return { status: true, sortedCounts };
    } catch (err) {
      console.error(err);
      return { status: false, message: err };
    }
    
  },
  
  getAllReviewersProfile: async (currentPage: number) => {
    try {
      const pageSize = 10; // Number of reviewers per page
      const skip = (currentPage - 1) * pageSize;
  
      // Fetch reviewers' profiles with pagination
      const response = await schema.Profile.find({})
        .skip(skip)
        .limit(pageSize);
  
      if (response && response.length > 0) {
        return { status: true, response };
      } else {
        return { status: false, message: "Reviewers not found" };
      }
    } catch (error) {
      return { status: false, message: "Error in fetching all reviewers' profiles" };
    }
  },
  
  getBestReviewers : async () =>{
     try {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0'); // Get the day and pad with leading zero if needed
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month (1-indexed) and pad with leading zero if needed
      const year = currentDate.getFullYear();
      console.log(`${day}-${month}-${year}`);
      
     const response = await schema.Events.aggregate([

        { $unwind: "$events" },

        {
            $match: {
                "events.date": {
                    $regex: `^\\d{2}-${month}-${year}$`
                }
            }
        },
     
        {
          $project: {
            "reviewerId": 1,
            "events.bookedEvents": 1
          }
        },
        // // Unwind the bookedEvents array
        { $unwind: "$events.bookedEvents" },
        // // Match events where booked and status are both true
        {
          $match: {
            "events.bookedEvents.booked": true,
            "events.bookedEvents.status": true
          }
        },
        // // Group by reviewerId and count the matching events
        { 
          $group: { 
            _id: "$reviewerId",
            count: { $sum: 1 }
          }
        },
        // Sort by count in descending order
        { $sort: { count: -1 } },
    
        { $limit: 5 }
      ])
    if(response.length > 0){
      console.log(response,";;;;;;;;;;;;;;;;;;;;;;;;");
      return {status:true,response}
    }
      
     } catch (error) {
      return {status:false,message:"Erron in the get best reviewers"}
     }
  },
  getBestReviewersDetails : async (reviewerId:string) =>{
      try {
        if(!reviewerId){
          return {status:false,message:"reviewer not found"}
        }
        const response = await schema.Profile.findOne({reviewerId:reviewerId})
        if(!response){
           return {status:false,message:"reviewer not found"}
        }
        const reviewerDetails:any = {
           reviewerId: response?.reviewerId,
           firstName : response?.firstName,
           lastName: response?.lastName,
           profile : response?.imageUrl
        }
        if(!reviewerDetails){
          return {status:false,message:"reviewer profile not updated"}
        }else{
           return {reviewerDetails}
        }
        
      } catch (error) {
        return {status:false,message:"Error in the get best reviewer details"}
      }
  },
  getReviewCountAnalyze : async () =>{
     try {
          const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0'); // Get the day and pad with leading zero if needed
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month (1-indexed) and pad with leading zero if needed
      const year = currentDate.getFullYear();
      console.log(`${day}-${month}-${year}`);
      const response = await schema.Events.aggregate([
        { $unwind: "$events" },

        {
            $match: {
                "events.date": {
                    $regex: `^\\d{2}-${month}-${year}$`
                }
            }
        },
     
        {
          $project: {
            "reviewerId": 1,
            "events.bookedEvents": 1
          }
        },
        // // Unwind the bookedEvents array
        { $unwind: "$events.bookedEvents" },
        // // Match events where booked and status are both true
        {
          $match: {
            "events.bookedEvents.booked": true,
            "events.bookedEvents.status": true
          }
        },
        // // Group by reviewerId and count the matching events
        { 
          $group: { 
            _id: "$reviewerId",
            count: { $sum: 1 }
          }
        },
        // Sort by count in descending order
        { $sort: { count: -1 } },
    
        // { $limit: 5 }
      ])
    if(response.length > 0){
      console.log(response,";;;;;;;;;;;;;;;;;;;;;;;; in review count analyzeeee");
      return {status:true,response}
    }

     } catch (error) {
      return {status:false,message:"Erro in get review count analyze"}
     }
  },
  getPerPageReviewers : async (perPage:number)=>{
     try {
 
      const response = await schema.Profile.find({}).limit(parseInt(perPage.toString())).exec()
      if(response && response.length > 0){
        return {status:true,response}
      }else{
        return {status:false,message:"per page reviewers details not found"}
      }

      
     } catch (error) {
       return {status:false,message:"Error in the get ask count reviewers"}
     }
  },
 getAllChatReviewers : async () => {
    try {
        // Find all profiles in the database
        const profiles = await schema.Profile.find({});
        
        // Extract the required fields from each profile
        const reviewersData = profiles.map(profile => {
            return {
                reviewerId: profile?.reviewerId,
                imageUrl: profile?.imageUrl,
                firstName: profile?.firstName,
                lastName: profile?.lastName,
                phone : profile?.phone
            };
        });

        return reviewersData;
    } catch (error) {
        // Handle errors
        console.error("Error fetching reviewers:", error);
        throw error;
    }
},
 getParticularEvents : async (reviewerId: any) => {
  try {
      if (!reviewerId) {
          return { status: false, message: "Not get Particular Events" };
      }

      // Fetch events from the database
      const eventData = await schema.Events.findOne({ reviewerId });

      if (!eventData) {
          return { status: false, message: "No events found for the given reviewerId" };
      }

      const events: any = eventData.events;

      // Get current date
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set hours to midnight for accurate comparison

      // Filter events based on dates after the current date
      const filteredEvents: any = events.filter((event: { date: any[] }) => {
          // Convert event dates to Date objects for comparison
          const eventDates: any = event.date.map((dateString: string) => {
              const [day, month, year] = dateString.split('-').map(Number);
              return new Date(year, month - 1, day); // Month is 0-based
          });

          // Check if any event date is after or equal to the current date
          return eventDates.some((date: Date) => date >= currentDate);
      });

      // Modify the filtered events to remove dates before the current date
      const filteredEventsWithCurrentDate = filteredEvents.map((event: any) => {
          event.date = event.date.filter((dateString: string) => {
              const [day, month, year] = dateString.split('-').map(Number);
              const eventDate = new Date(year, month - 1, day); // Month is 0-based
              return eventDate >= currentDate;
          });
          return event;
      });
      return { status: true, events: filteredEventsWithCurrentDate };
  } catch (error) {
      return { status: false, message: "Error in getting particular Events" };
  }
},




}
