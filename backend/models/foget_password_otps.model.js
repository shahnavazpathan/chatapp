import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    ref : 'users',
    required: true,
    unique: true,
  },
  otp: {
    type: Number,
    required: true,
    
  },
  isVerified : {
    type : Boolean,
    default : false,
  }
}, {timestamps : true});

const forget_password_otps = mongoose.model('forget_password_otps',otpSchema);

export default forget_password_otps;
