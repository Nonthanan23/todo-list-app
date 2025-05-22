const express = require("express");
const router = express.Router();
const User = require("../models/user");
const List = require("../models/list");

// ADD TASK
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    if (!title || !body || !email) {
      return res.status(400).json({ message: "Title, body, and email are required" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const list = new List({ title, body, user: existingUser._id });
    await list.save();

    existingUser.list.push(list._id);
    await existingUser.save();

    res.status(201).json({ message: "Task added successfully", list });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// UPDATE TASK
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).json({ message: "Title and body are required" });
    }

    const list = await List.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true }
    );

    if (!list) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", list });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE TASK
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const taskIndex = existingUser.list.indexOf(req.params.id);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not associated with user" });
    }

    await User.findByIdAndUpdate(existingUser._id, {
      $pull: { list: req.params.id },
    });

    const deletedTask = await List.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET TASKS
router.get("/getTasks/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const tasks = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
