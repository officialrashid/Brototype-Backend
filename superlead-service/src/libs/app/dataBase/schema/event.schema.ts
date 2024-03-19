import mongoose, { Document, Schema, Model } from "mongoose";

// Define the event interface
interface Event {
  id: string;
  title : string;
  startTime: string;
  endTime: string;
  label: string;
  customType: string;
  day: []; // Assuming this is an array of strings representing days of the week
  date: []; // Assuming this is an array of strings representing specific dates
  weekly: []; // Modify this according to your specific requirements
  monthly: []; // Modify this according to your specific requirements
  specificDays: []; // Modify this according to your specific requirements
  status: boolean; // Change to boolean type
}

// Define the document interface
interface EventsDocument extends Document {
  superleadId: string; // Changed 'superleadId' to 'reviewerId' assuming this was a typo
  events: Event[];
}

const eventSchema = new Schema({
  id: String,
  title:String,
  startTime: String,
  endTime: String,
  label: String,
  customType: String,
  day: [], // Array of strings representing days of the week
  date: [], // Array of strings representing specific dates
  weekly: [], // Modify this according to your specific requirements
  monthly: [], // Modify this according to your specific requirements
  specificDays: [], // Modify this according to your specific requirements
  status: Boolean // Change to Boolean type
});

const eventsSchema = new Schema({
  superleadId: String,
  events: [eventSchema],
});

const Events: Model<EventsDocument> = mongoose.model<EventsDocument>("Events", eventsSchema);

export { Events, Event, EventsDocument };