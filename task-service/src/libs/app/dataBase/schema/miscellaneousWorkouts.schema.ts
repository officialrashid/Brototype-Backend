import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const NestedQuestionSchema = new mongoose.Schema({
  Number: { type: Number, required: true },
  Question: { type: String, required: true },
  mainQuestionNumber: { type: Number, required: true },
});

const MiscellaneousWorkoutSchema = new mongoose.Schema({
  Number: { type: Number, required: true },
  question: { type: String, required: true },
});

const MiscellaneousWorkoutsSchema = new mongoose.Schema({
  technicalLeadId: { type: ObjectId, required: true },
  week: { type: String, required: true },
  miscellaneousWorkouts: [MiscellaneousWorkoutSchema],
  miscellaneousWorkoutNestedQuestions: [NestedQuestionSchema],
});


export const MiscellaneousWorkouts = mongoose.model('MiscellaneousWorkouts', MiscellaneousWorkoutsSchema);
