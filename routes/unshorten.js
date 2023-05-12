const { Router } = require("express");
const checkToken = require("../middlewares/checkToken");
const Url = require("../models/Url");

const router = Router();

router.get("/:shortner", async (req, res, next) => {
  const { shortner } = req.params;

  const urlData = await Url.findOne({ shortner });
  if (urlData) {
    res.status(301).redirect(urlData.url);
    next();
  } else {
    res.status(401).json({msg: "URL doesn't exist", url: req.url});

  }
});

module.exports = router;
