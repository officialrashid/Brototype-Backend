import mongoose, { Document } from "mongoose";
import moment from "moment"; // Import the moment library

// Define the event interface
interface Event {
  id: string;
  startTime: string;
  endTime: string;
  label: string;
  day: String;
  studentId: string;
  advisorId: string;
  booked: boolean;
  status: boolean;
  date : String

}

// Define the document interface
interface EventsDocument extends Document {
  reviewerId: string;
  events: Event[];
}

const eventSchema = new mongoose.Schema({
  id: String,
  startTime: String,
  endTime: String,
  label: String,
  day: String,
  studentId: String,
  advisorId: String,
  booked: Boolean,
  status: Boolean,
   date : String
});

const eventsSchema = new mongoose.Schema({
  reviewerId: String,
  events: [eventSchema],
});

const Events = mongoose.model<EventsDocument>("Events", eventsSchema);

export { Events, Event, EventsDocument };
