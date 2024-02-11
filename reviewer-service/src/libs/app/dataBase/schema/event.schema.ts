import mongoose, { Document, Schema, Model } from "mongoose";

// Define the event interface
interface Event {
  id: string;
  startTime: string;
  endTime: string;
  label: string;
  day: string;
  date: string;
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
  day: String,
  date: String,
  bookedEvents: [{}] // Specify the type as an array of empty objects
});

const eventsSchema = new Schema({
  reviewerId: String,
  events: [eventSchema],
});

const Events: Model<EventsDocument> = mongoose.model<EventsDocument>("Events", eventsSchema);

export { Events, Event, EventsDocument };
