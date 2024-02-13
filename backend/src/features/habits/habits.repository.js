import mongoose from "mongoose";
import { habitSchema } from "./schema/habit.schema.js";
import {userSchema} from "../user/user.schema.js";

const HabitModel = mongoose.model("Habit", habitSchema);
const userModel=mongoose.model("User",userSchema);

export const createNewHabit = async (userId, habit) => {
  try {
    // Create a new habit
    const newHabit = new HabitModel(habit);
    const savedHabit = await newHabit.save();

    // Add the new habit's _id to the user's habits array
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $push: { habits: savedHabit._id } },
      { new: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    return {
      success: true,
      msg: 'Habit created successfully',
      newHabit: savedHabit,
    };
    
  } catch (error) {
    return {
      success: false,
      msg: `Error: ${error.message}`,
    };
  }
};

export const findHabitById = async (_id) => {
  return await HabitModel.findById(_id);
};

export const updateHabitRepo = async (habitId, updatedHabit) => {
  return await HabitModel.findByIdAndUpdate(habitId, updatedHabit, {
    new: true,
  });
};

export const deleteHabitRepo = async (userId, habitId) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
   const index = user.habits.findIndex(habit => habit.toString() === habitId);
    if (index === -1) {
      throw new Error("Not authorized to delete others' habits");
    }
    user.habits.splice(index, 1);
    await user.save();
   const deletedHabit = await HabitModel.findByIdAndDelete(habitId);
    return deletedHabit;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting habit");
  }
};

export const getAllHabitsRepo = async () => {
  try {
    const habits = await HabitModel.find();
    return habits;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserHabitsRepo = async (userId) => {
  try {
    // Find the user with the specified habit ObjectId in their habits array
    const user = await userModel.findById(userId).populate({
      path: 'habits',
      model: 'Habit', 
    })
    return user.habits;
  } catch (error) {
    throw new Error(error.message);
  }
}
export const completedDeleteHabitRepo = async (userId, habitId) => {
  try {
    // Find the user with the specified userId
    const user = await userModel.findById(userId);
   if (!user) {
      throw new Error("User not found");}
    const index = user.completedHabits.findIndex((habit) => habit._id.toString() === habitId);
if (index === -1) {
      throw new Error("Completed habit not found");}
    user.completedHabits.splice(index, 1);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);}};
    

export const editCompletedRepo = async (habitId,dayId) => {
  try {
    const habit = await HabitModel.findById(habitId);
    if(!habit){
      throw new Error("habit not found");
    }
    // Find the index of the day with the specified dayId
    const dayIndex = habit.days.findIndex(day => day._id.toString() === dayId);
   if (dayIndex === -1) {
      throw new Error("Day not found in habit");
    }
 // Toggle the 'completed' value of the found day
 const completedValue = habit.days[dayIndex].completed;
 habit.completedDay += completedValue ? -1 : 1;
 
    habit.days[dayIndex].completed = !habit.days[dayIndex].completed;
// Save the updated habit
    const updatedHabit = await habit.save();
    if (!updatedHabit) {
      throw new Error("Failed to update habit");
    }
    else{
      return true;
    }
} catch (error) {
    throw new Error(error.message);
  }
};



export const endHabitRepo = async (userId, habitId) => {
  try {
    const user= await userModel.findById(userId);
    const habit = await HabitModel.findById(habitId);

    if (!user || !habit) {
      throw new Error('User or Habit not found');
    }

    // Update the 'completedHabits' array in the user document
    user.completedHabits.push({
      habitname: habit.habitName, 
      daysCompleted: habit.completedDay,
    });
    await user.save();
    await HabitModel.findByIdAndDelete(habitId);

    return {
      success: true,
      msg: "Habit ended successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      msg: `Error: ${error.message}`,
    };
  }
};

async function generateDateArray(startDate, numDays) {
  const dateArray = [];
  const options = { month: 'short', day: 'numeric' };

  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    dateArray.push({
      day: currentDate.toLocaleDateString('en-US', options),
      completed: false,
    });
  }

  return dateArray;
}




export const continueToNextWeekRepo = async (habitId) => {
  // Save the updated habit document
  const senddate = new Date(Date.now());
  const newDates = await generateDateArray(senddate, 7);

  try {
    const updatedHabit = await HabitModel.findByIdAndUpdate(
      habitId,
      { $set: { days: newDates } },
      { new: true }
    );

    if (!updatedHabit) {
      throw new Error('Habit not found');
    }

    return updatedHabit;
  } catch (error) {
    throw new Error(error.message);
  }
};
