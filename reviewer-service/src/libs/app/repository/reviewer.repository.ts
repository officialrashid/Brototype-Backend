
import schema from "../dataBase/schema"
import moment from "moment";
import mongoose from "mongoose";
import { reviewerProducer } from "../../../events/reviewerProducer"

export default {

  scheduleEventExist: async (reviewerId: any, startTime: moment.MomentInput, endTime: moment.MomentInput, day: any, date: string[]) => {
    try {
  
      const start = moment(startTime, 'hh:mma');
      const end = moment(endTime, 'hh:mma');

   
      const existingEvents: any = await schema.Events.find({
        reviewerId: reviewerId,
      });

  
      if (existingEvents?.length > 0) {
        for (const eventData of existingEvents[0].events) {
         
          if (date.some(d => eventData.date.includes(d))) {
            console.log("matcheddd");

          
            const existingStart = moment(eventData.startTime, 'hh:mma');
            const existingEnd = moment(eventData.endTime, 'hh:mma');
             console.log(existingStart,"existingStart existingStart");
             console.log(existingEnd),"existingEnd existingEnd";
             
            if (
              (start.isSameOrBefore(existingEnd) && end.isSameOrAfter(existingStart)) ||
              (existingStart.isSameOrBefore(end) && existingEnd.isSameOrAfter(start))
            ) {
              console.log("else ilaaaaa keriyeeeeeee");
              
              return { status: false };
            }
          }
        }
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
    const addThirtyMinutes = (timeString: any) => {
      // Parse the time string into hours, minutes, and am/pm
      const [hours, minutes, meridiem] = timeString.match(/(\d+):(\d+)([ap]m)/i).slice(1);

      // Convert hours to 24-hour format
      let hours24 = parseInt(hours, 10);
      if (meridiem.toLowerCase() === 'pm' && hours24 !== 12) {
        hours24 += 12;
      } else if (meridiem.toLowerCase() === 'am' && hours24 === 12) {
        hours24 = 0;
      }

      // Add 30 minutes
      const date = new Date();
      date.setHours(hours24);
      date.setMinutes(parseInt(minutes, 10) + 30);

      // Format the result back to AM/PM time with leading zeros if needed
      const resultHours = date.getHours();
      const resultMinutes = date.getMinutes();
      const resultMeridiem = resultHours < 12 ? 'am' : 'pm';
      const formattedHours = (resultHours % 12 || 12).toString().padStart(2, '0');
      const formattedMinutes = resultMinutes.toString().padStart(2, '0');

      return `${formattedHours}:${formattedMinutes}${resultMeridiem}`;
    };

    const splitTime = (startTime: any, endTime: number, interval: number) => {
      const result = [];
      let currentTime = startTime;

      while (currentTime < endTime) { // Stop if the current time is equal to or after the end time
        result.push(currentTime);
        currentTime = addThirtyMinutes(currentTime);

        // If the current time exceeds the end time, break the loop
        if (currentTime >= endTime) {
          break;
        }
      }

      return result;
    };

    const { reviewerId, startTime, endTime, label, day, id, studentId, advisorId, booked, status, date, customType } = data;

    try {
      // Check if a document with the given reviewerId exists
      let existingDocument: any = await schema.Events.findOne({ reviewerId });

      if (existingDocument) {
        // If the document exists, push the new event data
        date.forEach((dateString: any) => {
          const bookedEvents = splitTime(startTime, endTime, 30).map(interval => ({
            _id: new mongoose.Types.ObjectId(), // Generate ObjectId for the event
            startTime: interval,
            endTime: addThirtyMinutes(interval),
            advisorId: "",
            studentId: "",
            booked: false,
            status: false,
            date: dateString, // Add the date to each booked event,
            meetingUrl: ""
          }));

          existingDocument.events.push({
            _id: new mongoose.Types.ObjectId(),
            id,
            startTime,
            endTime,
            label,
            day,
            date: dateString,
            customType,
            bookedEvents,
            weekly: [],
            monthly: [],
            specifDays: []
          });
        });

        // Save the updated document
        const response = await existingDocument.save();
        return response;

      } else {
        // If the document doesn't exist, create a new one with the reviewerId and the new event
        existingDocument = await schema.Events.create({
          reviewerId,
          events: date.map((dateString: any) => ({
            _id: new mongoose.Types.ObjectId(),
            id,
            startTime,
            endTime,
            label,
            day,
            date: dateString,
            customType,
            bookedEvents: splitTime(startTime, endTime, 30).map(interval => ({
              _id: new mongoose.Types.ObjectId(), // Generate ObjectId for the event
              startTime: interval,
              endTime: addThirtyMinutes(interval),
              advisorId: "",
              studentId: "",
              booked: false,
              status: false,
              date: dateString, // Add the date to each booked event
              meetingUrl: ""
            })),
            weekly: [],
            monthly: [],
            specifDays: []
          })),
        });

        return existingDocument;
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

    const addThirtyMinutes = (timeString: any) => {
      // Parse the time string into hours, minutes, and am/pm
      const [hours, minutes, meridiem] = timeString.match(/(\d+):(\d+)([ap]m)/i).slice(1);

      // Convert hours to 24-hour format
      let hours24 = parseInt(hours, 10);
      if (meridiem.toLowerCase() === 'pm' && hours24 !== 12) {
        hours24 += 12;
      } else if (meridiem.toLowerCase() === 'am' && hours24 === 12) {
        hours24 = 0;
      }

      // Add 30 minutes
      const date = new Date();
      date.setHours(hours24);
      date.setMinutes(parseInt(minutes, 10) + 30);

      // Format the result back to AM/PM time with leading zeros if needed
      const resultHours = date.getHours();
      const resultMinutes = date.getMinutes();
      const resultMeridiem = resultHours < 12 ? 'am' : 'pm';
      const formattedHours = (resultHours % 12 || 12).toString().padStart(2, '0');
      const formattedMinutes = resultMinutes.toString().padStart(2, '0');

      return `${formattedHours}:${formattedMinutes}${resultMeridiem}`;
    };

    const splitTime = (startTime: any, endTime: number, interval: number) => {
      const result = [];
      let currentTime = startTime;

      while (currentTime < endTime) { // Stop if the current time is equal to or after the end time
        result.push(currentTime);
        currentTime = addThirtyMinutes(currentTime);

        // If the current time exceeds the end time, break the loop
        if (currentTime >= endTime) {
          break;
        }
      }

      return result;
    };

    const { reviewerId, startTime, endTime, label, day, id } = data;

    try {
      // Find the document that matches the reviewerId and contains the event with the specified ID
      let existingDocument = await schema.Events.findOne({ reviewerId, "events.id": id });

      if (existingDocument) {
        // Find the index of the event within the events array
        const eventIndex = existingDocument.events.findIndex(event => event.id === id);

        // Update the event details
        existingDocument.events[eventIndex].startTime = startTime;
        existingDocument.events[eventIndex].endTime = endTime;
        existingDocument.events[eventIndex].label = label;
        existingDocument.events[eventIndex].day = day;

        // Recalculate booked events based on the updated start and end times
        const updatedEvent: any = existingDocument.events[eventIndex];
        const bookedEvents: any = splitTime(updatedEvent.startTime, updatedEvent.endTime, 30).map(interval => ({
          _id: new mongoose.Types.ObjectId(), // Generate ObjectId for the booked event
          startTime: interval,
          endTime: addThirtyMinutes(interval),
          advisorId: "",
          studentId: "",
          booked: false,
          status: false,
          meetingUrl: ""
        }));

        existingDocument.events[eventIndex].bookedEvents = bookedEvents;

        // Save the updated document
        const response = await existingDocument.save();
        return { status: true, message: "Event updated successfully" };
      } else {
        return { status: false, message: "Event not found" };
      }
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
      const sortedCounts = await countsArray.map(({ count }) => count);
      console.log(sortedCounts, "await await");

      return { status: true, sortedCounts };
    } catch (err) {
      console.error(err);
      return { status: false, message: err };
    }

  },

  getAllReviewersProfile: async (currentPage: number) => {
    try {
      // const pageSize = 10; // Number of reviewers per page
      // const skip = (currentPage - 1) * pageSize;

      // Fetch reviewers' profiles with pagination
      const response = await schema.Profile.find({})
      // .skip(skip)
      // .limit(pageSize);

      if (response && response.length > 0) {
        return { status: true, response };
      } else {
        return { status: false, message: "Reviewers not found" };
      }
    } catch (error) {
      return { status: false, message: "Error in fetching all reviewers' profiles" };
    }
  },

  getBestReviewers: async () => {
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
      if (response.length > 0) {
        console.log(response, ";;;;;;;;;;;;;;;;;;;;;;;;");
        return { status: true, response }
      }

    } catch (error) {
      return { status: false, message: "Erron in the get best reviewers" }
    }
  },
  getBestReviewersDetails: async (reviewerId: string) => {
    try {
      if (!reviewerId) {
        return { status: false, message: "reviewer not found" }
      }
      const response = await schema.Profile.findOne({ reviewerId: reviewerId })
      if (!response) {
        return { status: false, message: "reviewer not found" }
      }
      const reviewerDetails: any = {
        reviewerId: response?.reviewerId,
        firstName: response?.firstName,
        lastName: response?.lastName,
        profile: response?.imageUrl
      }
      if (!reviewerDetails) {
        return { status: false, message: "reviewer profile not updated" }
      } else {
        return { reviewerDetails }
      }

    } catch (error) {
      return { status: false, message: "Error in the get best reviewer details" }
    }
  },
  getReviewCountAnalyze: async () => {
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
      if (response.length > 0) {
        console.log(response, ";;;;;;;;;;;;;;;;;;;;;;;; in review count analyzeeee");
        return { status: true, response }
      }

    } catch (error) {
      return { status: false, message: "Erro in get review count analyze" }
    }
  },
  getPerPageReviewers: async (perPage: number) => {
    try {

      const response = await schema.Profile.find({}).limit(parseInt(perPage.toString())).exec()
      if (response && response.length > 0) {
        return { status: true, response }
      } else {
        return { status: false, message: "per page reviewers details not found" }
      }


    } catch (error) {
      return { status: false, message: "Error in the get ask count reviewers" }
    }
  },
  getAllChatReviewers: async () => {
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
          phone: profile?.phone
        };
      });

      return reviewersData;
    } catch (error) {
      // Handle errors
      console.error("Error fetching reviewers:", error);
      throw error;
    }
  },
  getParticularEvents: async (reviewerId: any) => {
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
  updateParticularEvents: async (reviewerId: string, eventId: string, bookedEventId: string, advisorId: string, studentId: string, bookStatus: boolean, reviewId: string,cancel:boolean) => {
    try {
      if (!reviewerId || !eventId || !bookedEventId) {
        return { status: false, message: "Not update particular events" };
      }
      console.log(cancel,"----------");
     if(!cancel){
      console.log("PPPPPPPP");
      
      const response = await schema.Events.findOne({ reviewerId });
      console.log(response, "update eevents responseeeee");

      if (response) {
        const eventIdObj: any = new mongoose.Types.ObjectId(eventId);
        let bookedEventDetails: any = null; // Initialize variable to store booked event details

        response.events.forEach((evt: any) => {
          console.log(evt._id, "this is eventidssss");
          if (evt._id.equals(eventIdObj)) {
            const bookedEventIdObj = new mongoose.Types.ObjectId(bookedEventId);
            evt.bookedEvents.forEach((bookedEvt: any) => {
              if (bookedEvt._id.equals(bookedEventIdObj)) {
                bookedEvt.booked = bookStatus;
                bookedEvt.advisorId = advisorId;
                bookedEvt.studentId = studentId;
                // Store booked event details
                bookedEventDetails = bookedEvt;

              } else {
                return { status: false, message: "Booked event not found" }
              }
            });
          } else {
            return { status: false, message: "Event not found" }
          }
        });

        await response.save(); // Save changes to the database
        const bookedEventsData: any = {
          reviewerId: reviewerId,
          eventId: eventId,
          reviewId: reviewId,
          slotId: bookedEventDetails?._id,
          startTime: bookedEventDetails.startTime,
          endTime: bookedEventDetails.endTime,
          scheduledDate: bookedEventDetails.date,
          coordinatorId: bookedEventDetails.advisorId,
          cancel:cancel
        }
        console.log(bookedEventsData, "bookedEvenst detailssss");
        if (bookedEventsData) {
          const response = await reviewerProducer(bookedEventsData, 'review-booking-updation', 'bookedEvents');
        }
        return { status: true, message: "Successfully updated particular events", bookedEventDetails };

      } else {
        return { status: false, message: "Reviewer not found" }
      }
     }else{
      console.log("yyyyyyyyyyyy");
      const response = await schema.Events.findOne({ reviewerId });
      console.log(response, "update eevents responseeeee");

      if (response) {
        const eventIdObj: any = new mongoose.Types.ObjectId(eventId);
        let bookedEventDetails: any = null; // Initialize variable to store booked event details

        response.events.forEach((evt: any) => {
          console.log(evt._id, "this is eventidssss");
          if (evt._id.equals(eventIdObj)) {
            const bookedEventIdObj = new mongoose.Types.ObjectId(bookedEventId);
            evt.bookedEvents.forEach((bookedEvt: any) => {
              if (bookedEvt._id.equals(bookedEventIdObj)) {
                bookedEvt.booked = bookStatus;
                bookedEvt.advisorId = "";
                bookedEvt.studentId = "";
                // Store booked event details
                bookedEventDetails = "";

              } else {
                return { status: false, message: "Booked event not found" }
              }
            });
          } else {
            return { status: false, message: "Event not found" }
          }
        });

        await response.save(); // Save changes to the database
        const bookedEventsData: any = {
          reviewerId: "",
          eventId: "",
          reviewId: reviewId,
          slotId: "",
          startTime: "",
          endTime: "",
          scheduledDate: "",
          coordinatorId: advisorId,
          cancel:cancel
        }
        console.log(bookedEventsData, "bookedEvenst detailssss");
        if (bookedEventsData) {
          const response = await reviewerProducer(bookedEventsData, 'review-booking-updation', 'bookedEvents');
        }
        return { status: true, message: "Successfully updated particular events", bookedEventDetails };

      } else {
        return { status: false, message: "Reviewer not found" }
      }
     }
     
    } catch (error) {
      return { status: false, message: "Error in updating particular events: " + error };
    }
  },

  cancelParticularEvents: async (reviewerId: string, eventId: string, bookedEventId: string, advisorId: string, studentId: string, bookStatus: boolean) => {
    try {
      if (!reviewerId || !eventId || !bookedEventId) {
        return { status: false, message: "Not update particular events" };
      }
      console.log(eventId, "this is particular events iddssss", bookStatus);

      const response = await schema.Events.findOne({ reviewerId });
      console.log(response, "update eevents responseeeee");

      if (response) {
        const eventIdObj: any = new mongoose.Types.ObjectId(eventId);
        response.events.forEach((evt: any) => {
          console.log(evt._id, "this is eventidssss");
          if (evt._id.equals(eventIdObj)) {
            const bookedEventIdObj = new mongoose.Types.ObjectId(bookedEventId);
            evt.bookedEvents.forEach((bookedEvt: any) => {
              if (bookedEvt._id.equals(bookedEventIdObj)) {
                if (bookedEvt.advisorId === advisorId) {
                  bookedEvt.booked = bookStatus;
                  bookedEvt.advisorId = "";
                  bookedEvt.studentId = "";
                } else {
                  return { status: false, message: "not cancelled already booked anothor advisor" }
                }

              } else {
                return { status: false, message: "booked events not found" }
              }
            });
          } else {
            return { status: false, message: "event not found" }
          }
        });

        await response.save(); // Save changes to the database

        // Optional: Return the updated response if needed
        return { status: true, message: "Successfully cancelled particular events", response };
      } else {
        return { status: false, message: "reviewer not found" }
      }
    } catch (error) {
      return { status: false, message: "Error in updating particular events: " + error };
    }
  },
  getDomainWiseReviewers: async (domains: string) => {
    try {
      if (!domains) {
        return { status: false, message: "Domains array is invalid or empty" };
      }

      const response = await schema.Profile.find({ "PrefferedDomainsForReview": { $in: domains } });
      console.log(domains, "domainssssssssss");

      if (response.length === 0) {
        return { status: false, message: "No reviewers found for the specified domains" };
      }

      return { status: true, message: "Successfully retrieved domain-wise reviewers", reviewers: response };
    } catch (error) {
      return { status: false, message: "Error getting domain-wise reviewers: " + error };
    }
  },
  updateReviewCompleted: async (reviewerId: string, eventId: string, bookedEventId: string, status: boolean) => {
    try {
      if (!reviewerId || !eventId || !bookedEventId) {
        return { status: false, message: "Not update review completed status" }
      }
      const response = await schema.Events.findOne({ reviewerId });
      if (response) {
        const eventIdObj: any = new mongoose.Types.ObjectId(eventId);
        response.events.forEach((evt: any) => {
          if (evt._id.equals(eventIdObj)) {
            const bookedEventIdObj = new mongoose.Types.ObjectId(bookedEventId);
            evt.bookedEvents.forEach((bookedEvt: any) => {
              if (bookedEvt._id.equals(bookedEventIdObj)) {
                bookedEvt.status = status;
              } else {
                return { status: false, message: "booked event not found" }
              }
            });
          } else {
            return { status: false, message: "event not found" }
          }
        });

        await response.save(); // Save changes to the database

        // Optional: Return the updated response if needed
        return { status: true, message: "Successfully updated review completed status", response };
      } else {
        return { status: false, message: "reviewer not found" }
      }
    } catch (error) {
      return { status: false, message: "Error getting update review completed status" }
    }
  },
  getReviewes: async (reviewerId: string) => {
    try {
      if (!reviewerId) {
        return { status: false, message: "reviewerId not provided" };
      }

      // Convert the current date to the desired format
      const currentDate = moment().format("DD-MM-YYYY");
      const reviewes: any = []
      const event = await schema.Events.find({ reviewerId: reviewerId });
      if (!event) {
        return { status: false, message: "This reviewer has no booked events" }
      }


      const response = event[0].events.map((review, index) => {
        review.bookedEvents.map((data, index) => {
          if (data.date >= currentDate && data.booked === true) {
            console.log(data, "llll");
            reviewes.push(data)

          }
        })

      })
      if (reviewes.length > 0) {
        return { status: true, reviewes };
      }else{
        return { status: false, message:"No Reviewes Scheduled"};
      }

    } catch (error) {
      console.error(error); // Log the actual error for debugging
      return { status: false, message: "Error getting reviews" };
    }
  },




}
