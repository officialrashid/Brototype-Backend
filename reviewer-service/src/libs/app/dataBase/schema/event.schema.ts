import mongoose, { Document } from "mongoose";
import moment from "moment"; // Import the moment library

// Define the event interface
interface Event {
  createdAt: string;
  id: string;
  startTime: string;
  endTime: string;
  label: string;
  day: String;
  studentId: string;
  advisorId: string;
  booked: boolean;
  status: boolean;

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
  createdAt: {
    type: String, // Store as a formatted string
    default: () => moment().format("DD-MM-YYYY"), // Use default to set the current date in the specified format
  },
});

const eventsSchema = new mongoose.Schema({
  reviewerId: String,
  events: [eventSchema],
});

const Events = mongoose.model<EventsDocument>("Events", eventsSchema);

export { Events, Event, EventsDocument };
