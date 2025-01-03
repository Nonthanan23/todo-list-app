const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://betlomsak:AhViAF0lXBR8yynA@todo-list.zarst.mongodb.net/"
      )
      .then(() => {
        console.log("Connected to MongoDB");
      });
  } catch (error) {
    res.status(400).json({ message: "Error connecting to MongoDB", error });
  }
};
connectDB();