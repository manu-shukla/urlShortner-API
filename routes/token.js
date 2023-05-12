const { Router } = require("express");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const User = require("../models/User");
const router = Router();

router.get("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      msg: "Authentication Success!",
      email: user.email,
      token: user.token,
    });
  } else {
    res.status(400).json({
      msg: "Authentication Failed! Invalid Credentials",
      email,
      token: "",
    });
  }
});

router.get("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = uuid();
    const newUser = await User.create({ email, password, token });
    res.status(201).json({
      msg: "Success! New User Created",
      email: newUser.email,
      token: newUser.token,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({ msg: "Email Already Exists!", email, token: "" });
    } else
      res.status(400).json({
        msg: "Error occured while creating new user",
        email,
        token: "",
      });
  }
});

router.get("/reset", async (req, res) => {
  const { email, password } = req.body;
  const newToken = uuid();
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { token: uuid() },
      { new: true }
    );

    res.status(201).json({
      msg: "Token Reset Success!",
      email: updatedUser.email,
      token: updatedUser.token,
    });
  } else {
    res.status(400).json({
      msg: "Authentication Failed! Invalid Credentials",
      email,
      token: "",
    });
  }
});

router.get("/status", async (req, res) => {
  const { token } = req.body;

  const user = await User.findOne({ token });
  if (user) {
    res.status(201).json({ msg: "Success!", token, usage: user.usage });
  } else {
    res.status(401).json({ msg: "Invalid Token", token, usage: "" });
  }
});

module.exports = router;
