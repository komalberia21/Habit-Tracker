import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [3, "The name should be at least 3 characters long"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  habits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Habit', 
    },
  ],
  completedHabits: [
    {
   habitname: {
        type: String,
        required: true,
      },
      daysCompleted: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);

export default User;

