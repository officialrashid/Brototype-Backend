import mongoose, { Schema, Types } from 'mongoose';

const weekSchema = new mongoose.Schema({
  week: { type: String, required: true },
  status: {type: Boolean, required: true},
  repeat: { type: Boolean, default: false },
  reviewScore: { type: Number, required: true },
  communicationScore: { type: Number, required: true },
  personalWorkoutsScore: { type: Number, required: true },
  miscellaneousWorkouts: { type: Number, required: true },
  totalScore: { type: Number, required: true },
});

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  totalWeeks: {type:Number,required:true}, // Here it is defined as totalWeeks
  weeks: [weekSchema],
});

const manifestSchema = new mongoose.Schema({
  batchId: { type: String, required: true },
  students: [studentSchema],
});

const WeekRecord = mongoose.model('WeekRecord', manifestSchema);

export { WeekRecord };
