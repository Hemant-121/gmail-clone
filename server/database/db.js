import mongoose from "mongoose";

const Connection = async () => {
  const DB_URI =
    "mongodb+srv://mycodehome:mycodehome@gmailclone.x6z51sa.mongodb.net/gmail?retryWrites=true&w=majority";
  try {
    await mongoose.connect(DB_URI) //returns a promise
      .then(() => {
        console.log("DB connected");
      })
      .catch((err) => {
        console.log("Error is: ", err);
      });

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error while connecting with the database:", error.message);
  }
};

export default Connection;
