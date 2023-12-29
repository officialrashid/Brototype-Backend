import { callbackPromise } from "nodemailer/lib/shared";
import schema from "../dataBase/schema"
import reviewer from "../../controllers/reviewer";
import moment from "moment";



export default {

  scheduleEventExist: async (reviewerId: string, startTime: string, endTime: string, day: string) => {
    try {
      const existingEvents = await schema.Events.find({
        reviewerId: reviewerId,
        events: {
          $elemMatch: {
            startTime: startTime,
            endTime: endTime,
            day: day,
          },
        },
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

    const { reviewerId, startTime, endTime, label, day, id, studentId, advisorId, booked, status } = data;

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
     
      
      const response = await schema.Events.find({
        reviewerId,
        "events.createdAt": day,
      });
      
      console.log(response,"dfbjdfdgfdgfhdgfhdfdfhd");
      
      return response;
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
  }





}


