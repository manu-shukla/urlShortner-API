const User = require("../models/User");

const checkToken = async (req, res, next) => {
  const { token } = req.body;
  const user = await User.findOne({ token });
  if (user) {
    if (user.usage <= user.limit) {
      res.locals.user = user;
      next();
    } else {
      res.status(401).json({ msg: "Token limit Exceeded!", token });
    }
  } else {
    res.status(401).json({ msg: "Invalid Token", token });
  }
};

module.exports = checkToken;
