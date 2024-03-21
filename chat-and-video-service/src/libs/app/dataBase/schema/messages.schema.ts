import mongoose, { Schema, Types } from "mongoose";

const messageSchema=new Schema ({

    senderId:{type:Schema.Types.ObjectId,required:true},
    receiverId:{type:Schema.Types.ObjectId,required:true},
    content:{type:String,required:true},
    type:{type:String,required:true},
    read:{type:Boolean , required:true ,default:false}

},{
    timestamps:true
})

const Messages = mongoose.model("Messages", messageSchema);

export {
    Messages,
};



