import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Connecting to database");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "share_prompt",
    });

    isConnected = true;
    console.log("Connected to database");
  } catch (e) {
    console.log(e);
  }
};
