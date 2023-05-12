const { Router } = require("express");
const checkToken = require("../middlewares/checkToken");
const Url = require("../models/Url");

const router = Router();

router.post("/", checkToken, async (req, res) => {
  const { url, shortner } = req.body;

  try {
    const saveUrl = await Url.create({ url, shortner });
    res.status(201).json({
      msg: "Url Shortened!",
      shortUrl: `${req.get("host")}/s/${saveUrl.shortner}`,
      url: saveUrl.url,
    });
  } catch (error) {
    if (error.code == 11000) {
      res.status(401).json({
        msg: "Shortner Not Available! Try Something else.",
        url,
        shortner,
      });
    } else {
      res
        .status(401)
        .json({ msg: "Invalid URL or internal server Error", url, shortner });
    }
  }
});

module.exports = router;
