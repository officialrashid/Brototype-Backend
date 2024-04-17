import mongoose, { Document, Schema, Model } from "mongoose";

// Define the event interface
interface Event {
  id: string;
  startTime: string;
  endTime: string;
  label: string;
  customType: String;
  day: [];
  date: [];
  weekly: [];
  monthly: [];
  specifDays: [];
  bookedEvents: {
    _id: mongoose.Types.ObjectId; // Include ObjectId inside bookedEvents object
    date: string;
    startTime: string;
    endTime: string;
    advisorId: string;
    studentId: string;
    booked: boolean;
    status: boolean;
  }[]; // Specify the type as an array of objects
}

// Define the document interface
interface EventsDocument extends Document {
  reviewerId: string;
  events: Event[];
}

const bookedEventsSchema = new Schema({
  _id: Schema.Types.ObjectId, // Define ObjectId type
  date: String,
  startTime: String,
  endTime: String,
  advisorId: String,
  studentId: String,
  booked: Boolean,
  status: Boolean,
});

const eventSchema = new Schema({
  id: String,
  startTime: String,
  endTime: String,
  label: String,
  customType: String,
  weekly: [],
  monthly: [],
  specifDays: [],
  day: [],
  date: [],
  bookedEvents: [bookedEventsSchema], // Use the bookedEvents schema
});

const eventsSchema = new Schema({
  reviewerId: String,
  events: [eventSchema],
});

const Events: Model<EventsDocument> = mongoose.model<EventsDocument>("Events", eventsSchema);

export { Events, Event, EventsDocument };
