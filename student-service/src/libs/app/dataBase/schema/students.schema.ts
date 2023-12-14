import mongoose, { Schema, Types } from 'mongoose';

const manifestSchema = new mongoose.Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  firstName: String,
  lastName: String,
  domain: String,
  batch: String,
  imageUrl: String,
});

const Manifest = mongoose.model('Manifest', manifestSchema);

export { Manifest };
