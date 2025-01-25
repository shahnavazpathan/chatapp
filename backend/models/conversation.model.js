import mongoose from "mongoose";
import { Schema } from "mongoose";


const messageSchema = new mongoose.Schema({
    senderId: { type: Schema.Types.ObjectId, ref: 'users', required: true }, 
    message: { type: String, required: true }, 
    timestamp: { type: Date, default: Date.now }, 
  });

const conversationSchema = new mongoose.Schema({
  participents: {
    type: [Schema.Types.ObjectId],
    ref : 'users', 
    required: true,
    
  },
  messages: [messageSchema],
});

const Conversation = mongoose.model('conversation',conversationSchema);

export default Conversation;
