import mongoose from "mongoose";

const baseUrl = process.env.MONGODB || "0.0.0.0:27017";

export const connectToDb = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/HabitTracker`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};
