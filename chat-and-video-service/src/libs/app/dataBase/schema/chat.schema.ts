import mongoose, { Schema, Types } from "mongoose";

const chatSchema = new mongoose.Schema({
    participants: [{
        initiatorId: { type: Schema.Types.ObjectId, required: true },
        recipientId: { type: Schema.Types.ObjectId, required: true },
        initiatorUnReadMessages: { type: Number, required: true, default: 0 },
        recipientUnReadMessages: { type: Number, required: true, default: 0 }
    }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Messages" }],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Messages" }
}, {
    timestamps: true
})

const Chat = mongoose.model("Chat", chatSchema);

export {
    Chat,
};




