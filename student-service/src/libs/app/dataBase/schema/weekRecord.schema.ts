import mongoose from 'mongoose';

// Define your Mongoose schemas
const weekSchema = new mongoose.Schema({
  week: { type: String },
  status: { type: Boolean },
  repeat: { type: Boolean },
  reviewScore: { type: Number },
  communicationScore: { type: Number },
  personalWorkoutsScore: { type: Number },
  miscellaneousWorkouts: { type: Number },
  totalScore: { type: Number }, // Store totalScore as string
  advisorName: { type: String },
  reviewerName: { type: String },
  date: { type: String },
  pendingTopics: { type: Array },
  nextWeekUpdation: { type: Array },
  personalWorkoutReview: { type: Array },
  MiscellaneousWorkoutsReview: { type: Array },
  CommunicationReview: { type: Array },
});

const studentSchema = new mongoose.Schema({
  studentId: { type: String },
  totalWeeks: { type: Number },
  weeks: [weekSchema],
});

const manifestSchema = new mongoose.Schema({
  batchId: { type: String },
  students: [studentSchema],
});

// Create the model
const WeekRecord = mongoose.model('WeekRecord', manifestSchema);

export { WeekRecord }