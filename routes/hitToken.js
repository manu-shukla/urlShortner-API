const { Router } = require("express");
const User = require("../models/User");
const checkToken = require("../middlewares/checkToken");

const router = Router();

router.get("/hit", checkToken, async (req, res) => {
  const { token, _id, email, usage } = res.locals.user;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { usage: usage + 1 },
    { new: true }
  );

  res.status(201).json({
    msg: "Token Hit Success!",
    email: updatedUser.email,
    usage: updatedUser.usage,
  });
});

module.exports = router;
