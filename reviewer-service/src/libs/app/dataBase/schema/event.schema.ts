import mongoose, { Document, Schema, Model } from "mongoose";

// Define the event interface
interface Event {
  id: string;
  startTime: string;
  endTime: string;
  label: string;
  customType :String;
  day: [];
  date: [];
  weekly : [];
  monthly : [];
  specifDays : []
  bookedEvents: {}[]; // Specify the type as an array of empty objects
}

// Define the document interface
interface EventsDocument extends Document {
  reviewerId: string;
  events: Event[];
}

const eventSchema = new Schema({
  id: String,
  startTime: String,
  endTime: String,
  label: String,
  customType: String,
  weekly : [],
  monthly : [],
  specifDays : [],
  day: [],
  date: [],
  bookedEvents: [{}] // Specify the type as an array of empty objects
});

const eventsSchema = new Schema({
  reviewerId: String,
  events: [eventSchema],
});

const Events: Model<EventsDocument> = mongoose.model<EventsDocument>("Events", eventsSchema);

export { Events, Event, EventsDocument };
