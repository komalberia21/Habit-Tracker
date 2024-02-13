import mongoose from "mongoose";

export const habitSchema = new mongoose.Schema({
  habitName: {
    type: String,
    required: [true, "Habit name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedDay: {
    type: Number,
    default: 0,
  },
  
  days: [
    {
      day: {
        type: String,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

// Function to generate an array of dates in the format "Month Day" (e.g., "Feb 1")
 export function generateDateArray(startDate, numDays) {
  const dateArray = [];
  const options = { month: 'short', day: 'numeric' };

  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    dateArray.push(currentDate.toLocaleDateString('en-US', options));
  }

  return dateArray;
}


// Middleware to automatically generate the 'days' array
habitSchema.pre('save', function (next) {
  if (!this.days.length) {
    // If 'days' array is not already filled, generate it based on 'createdAt'
    const generatedDays = generateDateArray(this.createdAt, 7);
    for(let i=0;i<generatedDays.length;i++){
      const newdate={
        day:generatedDays[i],
        completed:false,
      }
      this.days.push(newdate);
    }
    }
  next();
});

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
