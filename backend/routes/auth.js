const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//SIGNUP

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10); // Include salt rounds
    const user = new User({ email, username, password: hashpassword });

    await user.save(); // Save the user directly without .then()
    res.status(200).json({ message: "User created successfully" }); // Send a response
  } catch (error) {
    // Check for duplicate email or other errors here if needed
    res.status(200).json({ message: "User already exists" }); // Ensure only one response
  }
});



//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({ message: "Please Sign Up First" }); // Exit function
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(200).json({ message: "Wrong Password" }); // Exit function
    }

    const { password, ...others } = user._doc;
    res.status(200).json({ others }); // Send successful response
  } catch (error) {
    res.status(200).json({ message: "An error occurred" }); // General error handling
  }
});



module.exports = router;