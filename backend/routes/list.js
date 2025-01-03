const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");


//ADD TASK
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const list = new List({ title, body, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});


//update task
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const list = await List.findByIdAndUpdate(req.params.id, { title, body });
      list.save().then (() => res.status(200).json({ message: "Task Updated" }));
    }
  } catch (error) {
    console.log(error);
  }
});


//delete task
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOneAndUpdate({ email }, { $pull: { list: req.params.id } });
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ message: "Task Deleted" })
      );
    }
  } catch (error) {
    console.log(error);
  }
});


//get tasks
router.get("/getTasks/:id", async (req, res) => {
  const list = await List.find({ user: req.params.id }).sort ({ createdAt: -1 });
  if (list) {
    res.status(200).json({ list: list });
  }
  else {
    res.status(400).json({ message: "No tasks found" });
  }
});

module.exports = router;