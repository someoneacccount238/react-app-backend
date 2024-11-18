 
import mongoose from 'mongoose';

const FoodEntry = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
    }, 
    foodCalories: {
      type: Number,
      default: 0,
    },
    foodWeight: {
      type: Number,
      default: 0,
    } 
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('FoodEntry', FoodEntry);

