
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  { 
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    }, 
  },
  {
    timestamps:true
  } 
);

export default mongoose.model('User', User);