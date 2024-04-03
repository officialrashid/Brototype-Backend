import mongoose, { Schema } from "mongoose";


const chatersSchema =new mongoose.Schema(
    {
        chaterId: { type: Schema.Types.ObjectId, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phone: { type: Number},
        imageUrl: { type: String, required: true }, // changed default value to empty string
        isOnline: {
            type: Boolean,
            default: false
        },
        lastSeen: {
            type: String,
            default: ""
        },
    },
    { timestamps: true }
);

const Chaters = mongoose.model("Chaters", chatersSchema);

export { Chaters };
