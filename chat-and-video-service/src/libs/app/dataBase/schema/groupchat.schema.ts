import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    profile: { type: String },
    groupName: { type: String, required: true },
    description: { type: String },
    participants: [{
        participant: { type: mongoose.Schema.Types.ObjectId },
        unreadMessagesCount: { type: Number, default: 0 }
    }],
    admins: [{ type: mongoose.Schema.Types.ObjectId}],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "GroupMessages" }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "GroupMessages" }
}, { timestamps: true });

const GroupChat = mongoose.model('GroupChat', groupSchema);


export { GroupChat };
