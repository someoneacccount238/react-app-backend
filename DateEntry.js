 
import mongoose from 'mongoose';

const DateEntry = new mongoose.Schema(
  { 
    date: {
      type: Date,
      default: 0,
    },
     calories: {
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

export default mongoose.model('DateEntry', DateEntry);

