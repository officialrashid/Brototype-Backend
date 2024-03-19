import schema from "../dataBase/schema"
import config from "../../../config/config";
import jwt from 'jsonwebtoken'
import { format } from 'date-fns'
import admin from 'firebase-admin';
import firebaseAccountCredentials from '../../../../brototype-29983-firebase-adminsdk-9qeji-41b48a5487.json'
import superlead from "../../controllers/superlead";

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

});

export default {

  checkEmailAndPhone: async (email: string, phone: string, superleadId: string) => {
    try {
      const response = await schema.Superlead.find({ $or: [{ email }, { phone }] });
      if (response.length > 0) {
        console.log(response[0].superleadId, "dncnd cmnd");
        if (response[0].superleadId === superleadId) {
          return { status: true, message: "same Superlead email and password" }
        } else {
          return { status: false, message: "not same superlead email and password " }
        }
      } else {
        return response;
      }


    } catch (err) {
      console.log(err, "error in the invigilatorEmailExist check function");
    }
  },
  updateProfile: async (data: { superleadId: string; imageUrl: string; firstName: string; lastName: string; email: string; phone: string; gender: string; dateOfBirth: string; hubLocation: string, qualification: string; pastYourWorkedCompany: string; yearOfExpereience: string }) => {
    try {
      // Check if the profile with the given superleadId exists
      const existingProfile = await schema.Superlead.findOne({
        superleadId: data.superleadId
      });

      if (existingProfile) {
        // If profile exists, update specific fields with the new data
        const updatedProfile = await schema.Superlead.findOneAndUpdate(
          { superleadId: data.superleadId },
          {
            $set: {
              imageUrl: data.imageUrl || existingProfile.imageUrl,
              firstName: data.firstName || existingProfile.firstName,
              lastName: data.lastName || existingProfile.lastName,
              email: data.email || existingProfile.email,
              phone: data.phone || existingProfile.phone,
              gender: data.gender || existingProfile.gender,
              dateOfBirth: data.dateOfBirth || existingProfile.dateOfBirth,
              hubLocation: data.hubLocation || existingProfile.hubLocation,
              qualification: data.qualification || existingProfile.qualification,
              pastYourWorkedCompany: data.pastYourWorkedCompany || existingProfile.pastYourWorkedCompany,
              yearOfExpereience: data.yearOfExpereience || existingProfile.yearOfExpereience,
              // Add other fields here if needed
            }
          },
          { new: true }
        );

        return updatedProfile;
      } else {
        // If profile doesn't exist, create a new profile
        const newProfile = await schema.Superlead.create(data);
        return newProfile;
      }
    } catch (err) {
      console.log(err, "error in the Enqueries repository function");
    }
  },

  getProfile: async (superleadId: string) => {
    try {
      if (!superleadId) {
        return { status: false, message: "Your Profile Not Found" }
      }
      const response = await schema.Superlead.find({ superleadId: superleadId })
      return response;
    } catch (error) {
      return { status: false, message: "Error in the Superlead Profile Access" }
    }
  },
  patchSuperleadProfile: async (data: any) => {
    try {
      if (!data || !data.superleadId) {
        return { status: false, message: "Superlead not found" };
      }

      const existingProfile = await schema.Superlead.findOne({
        superleadId: data.superleadId
      });

      if (!existingProfile) {
        return { status: false, message: "Superlead not found" };
      }

      const updatedProfile = await schema.Superlead.updateOne(
        { superleadId: data.superleadId },
        {
          $set: {
            imageUrl: data.imageUrl || existingProfile.imageUrl,
            firstName: data.firstName || existingProfile.firstName,
            lastName: data.lastName || existingProfile.lastName,
            email: data.email || existingProfile.email,
            phone: data.phone || existingProfile.phone,
            gender: data.gender || existingProfile.gender,
            dateOfBirth: data.dateOfBirth || existingProfile.dateOfBirth,
            hubLocation: data.hubLocation || existingProfile.hubLocation,
            qualification: data.qualification || existingProfile.qualification,
            pastYourWorkedCompany: data.pastYourWorkedCompany || existingProfile.pastYourWorkedCompany,
            yearOfExperience: data.yearOfExperience || existingProfile.yearOfExpereience,
            // Add other fields here if needed
          }
        }
      );

      if (!updatedProfile) {
        return { status: false, message: "Profile not updated" };
      } else {
        return { status: true, message: "Superlead profile updated successfully" };
      }

    } catch (error) {
      return { status: false, message: "Error in updating the Superlead profile" };
    }
  },
  getAllChatSuperleads: async () => {
    try {
      const result = await schema.Superlead.aggregate([

        {
          $project: {
            superleadId: 1,
            imageUrl: 1,
            firstName: 1,
            lastName: 1,
            phone: 1
          }
        }
      ]);


      if (result && result.length > 0) {
        console.log(result, "result comnggg");
        return { status: true, result }
      }

    } catch (error) {
      return { status: false, message: "Error int the get all chat superleads" }
    }
  },
  updateActivityEvents: async (data: any) => {
    try {
      if (!data) {
        return { status: false, message: "not found schedule Events data" };
      }

      console.log(data.superleadId, "superleadis cimngggg");

      const { superleadId, title, startTime, endTime, label, day, id, status, date, customType } = data;

      try {
        // Check if a document with the given superleadId exists
        const existingDocument = await schema.Events.findOne({ superleadId });

        if (existingDocument) {
          existingDocument.events.push({
            id,
            title,
            startTime,
            endTime,
            label,
            day,
            date,
            customType,
            weekly: [],
            monthly: [],
            specificDays: [],
            status: false // Setting status to false
          });

          // Save the updated document
          const response = await existingDocument.save();
          return response;
        } else {
          // If the document doesn't exist, create a new one with the superleadId and the new event
          const newDocument = await schema.Events.create({
            superleadId,
            events: [
              {
                id,
                title,
                startTime,
                endTime,
                label,
                day,
                date,
                customType,
                weekly: [],
                monthly: [],
                specificDays: [],
                status: false // Setting status to false
              },
            ],
          });

          return newDocument;
        }
      } catch (err) {
        console.error(err, "Error in creating/updating events");
        throw err;
      }
    } catch (error) {
      return { status: false, message: "Error Occurred while creating activity timeline" };
    }
  },
  getAllActivityEvents: async (superleadId: string) => {
    try {
      if (!superleadId) {
        return { status: false, message: "Yoyr Activity Events not found" }
      }
      const response = await schema.Events.find({ superleadId: superleadId })
      return response;
    } catch (error) {
      return { status: false, message: "Erron Occured while get activity timeline" }
    }
  },
  getActivityTimeLineup: async (superleadId: string) => {
    try {
      if (!superleadId) {
        return { status: false, message: "Superlead ID not provided" };
      }


      const currentDate = new Date(); // get current date
      const formatDate = format(currentDate, "dd-MM-yyyy") // formatted Date DD-MM-YYY.


      const events = await schema.Events.findOne({ superleadId }); // Assuming schema.Events is your Mongoose model
      if (!events) {
        return { status: false, message: "Activity events not found" };
      }

      // Filter events based on the target date
      const filteredEvents = events.events.filter((event: any) => {
        return event.date.includes(formatDate);
      });

      console.log(filteredEvents, "Filtered events for target date:", formatDate);

      return { status: true, events: filteredEvents };
    } catch (error) {
      console.error("Error occurred while getting activity timeline:", error);
      return { status: false, message: "Error occurred while getting activity timeline" };
    }
  },
  editActivityEvents: async (data: any) => {
    try {
        if(!data){
          return {status:false,message:"Event data not found"}
        }
        const { superleadId, title, startTime, endTime, label, day, id } = data;
          // Assuming you are using MongoDB, use the appropriate method to update the document based on both reviewerId and event ID
          const response = await schema.Events.updateMany(
            { superleadId, "events.id": id }, // Match based on both reviewerId and event ID
            {
              $set: {
                "events.$.title":title,
                "events.$.startTime": startTime,
                "events.$.endTime": endTime,
                "events.$.label": label,
                "events.$.day": day,
              }
            }
          );
    
          // Handle the response accordingly
    
    
          return { status: true, message: "Event updated successfully" };
      
    } catch (error) {
      return {status:false,message:"Error occured while edit activity events"}
    }
  },
  deleteActivityEvents : async (data:any) =>{
    try {
      const { superleadId, id } = data;
      console.log(id, "id coming for delete api");
    
      const response = await schema.Events.updateOne(
        { superleadId, "events.id": id },
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
  }

}


