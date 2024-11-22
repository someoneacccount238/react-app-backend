 
import mongoose from 'mongoose';

const WorkEntry = new mongoose.Schema(
  { 
    date: {
      type: Date,
      default: 0,
    },
    workHours: {
        type: Number,
        default: 0,
      },
      user_id:{
        type: String,
        default: 0,
      }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('WorkEntry', WorkEntry);

