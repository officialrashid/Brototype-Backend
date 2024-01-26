import { callbackPromise } from "nodemailer/lib/shared";
import schema from "../dataBase/schema"
import reviewer from "../../controllers/reviewer";
import moment from "moment";



export default {

  scheduleEventExist: async (reviewerId: string, startTime: string, endTime: string, day: string) => {
    try {
      const existingEvents = await schema.Events.find({
        reviewerId: reviewerId,
        $or: [
          {
        events: {
          $elemMatch: {
            startTime: startTime,
            endTime: endTime,
            day: day,
          },
        },
      },
      {
        events: {
          $elemMatch: {
            startTime: startTime,
            day: day,
          },
        },
      },
      {
        events: {
          $elemMatch: {
            endTime: endTime,
            day: day,
          },
        },
      },
      ],
      });

      if (existingEvents.length > 0) {
        // Event already exists


        return { status: false, message: "Event already scheduled for the specified time and date." };
      }

      return existingEvents;
    } catch (err) {
      console.log(err, "error in the scheduleEventExist check function");
      throw err;
    }
  },


  scheduleEvents: async (data: any) => {
    if (!data) {
      return { status: false, message: "Data is missing" };
    }

    const { reviewerId, startTime, endTime, label, day, id, studentId, advisorId, booked, status,date } = data;

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
          studentId: "",
          advisorId: "",
          booked: false,
          status: false,
          
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
              studentId: "",
              advisorId: "",
              booked: false,
              status: false,
              
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
    console.log(day,"pppppppp");
    
    try {
     

      const reviewer = await schema.Events.findOne({reviewerId})
      if(!reviewer){
        return { status:false,messsage:"reviewer not found"}
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
  profileUpdate: async (profileData: { reviewerId: any; imageUrl: any; firstName: any; lastName: any; email: any; phone: any; age:string;gender:string }) => {
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
  getProfile : async (reviewerId:string)=>{
     try {
       const response = await schema.Profile.find({reviewerId:reviewerId})
       return response
     } catch (error) {
      return {status:false,message:"some issue in get profile" }
     }
  }


}


