import express from "express";
import { auth } from "../../middlewares/jwtAuth.js";
import {
  postHabit,
  deleteHabit,
  editHabit,
  endHabit,
  continueToNextWeek,
  getAllHabits,
  editCompleted,
  getUserHabits,
  completedDeleteHabit

} from "./habits.controller.js";

const habitrouter = express.Router();

// POST a new habit
habitrouter.route("/add/:userId").post(postHabit);
 //Get all habits
 habitrouter.route("/getallhabits").get(getAllHabits)

 habitrouter.route("/getallhabitsofuser/:userId").get(getUserHabits);

// DELETE a habit by ID
habitrouter.route("/delete/:habitId/:userId").delete(deleteHabit);
// DELETE a completed habit by ID
habitrouter.route("/completedHabit/:habitId/:userId").delete(completedDeleteHabit);

// PUT/UPDATE a habit by ID
habitrouter.route("/edit/:habitId").put(editHabit);

habitrouter.route("/togglecompleted/:habitId/:dayId").get(editCompleted);

// PUT/UPDATE to end a habit by ID
habitrouter.route("/end/:id/:userId").put(endHabit);

// PUT/UPDATE to continue to the next week for a habit by ID
habitrouter.route("/continue/:id").put(continueToNextWeek);

export default habitrouter;
