import { customErrorHandler } from "../../middlewares/errorHandler.js";
import {
  createNewHabit,
  findHabitById,
  updateHabitRepo,
  deleteHabitRepo,
  endHabitRepo,
  continueToNextWeekRepo,
  getAllHabitsRepo,
  editCompletedRepo,
  getUserHabitsRepo,
  completedDeleteHabitRepo
} from "./habits.repository.js";

export const postHabit = async (req, res, next) => {
  //const userId=req._id;
  const userId=req.params.userId;
  console.log("userId",userId);
  try {
    const resp = await createNewHabit(userId,req.body);
    if (resp) {
      console.log("habit created");
      res.status(201).json({
        success: true,
        msg: "Habit added successfully",
        habit: resp,
      });
    } else {
      res.status(400).json({ success: false, msg: "Bad request" });
    }
  } catch (error) {
    next(new customErrorHandler(400, error));
  }
};

export const deleteHabit = async (req, res, next) => {
  const userId=req.params.userId;
  const habitId = req.params.habitId;
  try {
    const habit = await findHabitById(habitId);
    if (!habit) {
      return next(new customErrorHandler(404, "Habit not found"));
    }
   // Add logic to delete the habit
    const deletedHabit = await deleteHabitRepo(userId,habitId);
    if(deletedHabit){
     res.status(200).json({ success: true, msg: "Habit deleted successfully" });
    }
    else{
      res.status(400).json({success:false,msg:"Problem deleting habits"});
    }
  } catch (error) {
    next(new customErrorHandler(400, error));
  }
};

export const editHabit = async (req, res, next) => {
  const habitId = req.params.habitId;
  try {
    const habit = await findHabitById(habitId);
    if (!habit) {
      return next(new customErrorHandler(404, "Habit not found"));
    }
    // Add logic to update/edit the habit
    const newhabit={
      habitName:req.body.habitName,
      description:req.body.description
    }
    
     const updatedHabit = await updateHabitRepo(habitId,newhabit);
     if(updatedHabit){
    res.status(200).json({ success: true, msg: "Habit updated successfully" });
    }
  } catch (error) {
    next(new customErrorHandler(400, error));
  }
};

export const getAllHabits = async (req, res, next) => {
  try {
    const habits = await getAllHabitsRepo();
    res.status(200).json({ success: true, data: habits });
  } catch (error) {
    next(new Error(error));
  }
};

export const getUserHabits=async(req,res,next)=>{
  try{
    const userId=req.params.userId;
    const habits= await getUserHabitsRepo(userId);
    res.status(200).json({ success: true, data: habits });
}catch(error){
  next(new Error(error));

 }
};
export const completedDeleteHabit=async(req,res,next)=>{
  try{
    const habitId=req.params.habitId;
    const userId=req.params.userId;
    const user= await completedDeleteHabitRepo(userId,habitId);
    res.status(200).json({ success: true,data:user });
}catch(error){
  next(new Error(error));
 }
};

export const editCompleted=async(req,res,next)=>{
  const habitId=req.params.habitId;
  const dayId=req.params.dayId;
  try{
    const habit= await editCompletedRepo(habitId,dayId);
    if(habit){
    res.status(200).json({ success: true});
    }
    else{
      res.status(400).json({success:false,msg:"falied to toggle"});
    }
  } catch (error) {
    next(new Error(error));
  }
}

export const endHabit = async (req, res, next) => {
  const habitId = req.params.id;
  const userId=req.params.userId;
  console.log("userid in end",userId);
  try {
    const habit = await findHabitById(habitId);
    if (!habit) {
      return next(new customErrorHandler(404, "Habit not found"));
    }
    const resp = await endHabitRepo(userId,habitId);
    if(resp.success){
      res.status(200).json({ success: true, msg: "Habit ended successfully", resp });
    }
    else{
      res.status(200).json({ success: true, msg: "Habit did not ended successfully", resp });

    }
  } catch (error) {
    next(new customErrorHandler(400, error));
  }
};

export const continueToNextWeek = async (req, res, next) => {
  const habitId = req.params.id;
  try {
    const habit = await findHabitById(habitId);
    if (!habit) {
      return next(new customErrorHandler(404, "Habit not found"));
    }
    const resp = await continueToNextWeekRepo(habitId);

    res.status(200).json({
      success: true,
      msg: "Continued to the next week successfully",
      resp,
    });
  } catch (error) {
    next(new customErrorHandler(400, error));
  }
};
