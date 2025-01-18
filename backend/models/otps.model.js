import mongoose from "mongoose";
import { Schema } from "mongoose";

const otpSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref : 'users',
    required: true,
    unique: true,
  },
  otp: {
    type: Number,
    required: true,
    
  },
}, {timestamps : true});

const otpDoc = mongoose.model('otps',otpSchema);

export default otpDoc;
