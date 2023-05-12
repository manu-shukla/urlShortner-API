const { Router } = require("express");
const checkToken = require("../middlewares/checkToken");
const Url = require("../models/Url");

const router = Router();

router.post("/", checkToken, async (req, res) => {
  const { url, shortner } = req.body;

  try {
    const saveUrl = await Url.create({ url, shortner });
    res
      .status(201)
      .json({
        msg: "Url Shortened!",
        shortUrl: `${req.get("host")}/s/${saveUrl.shortner}`,
        url: saveUrl.url,
      });
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});




module.exports  = router;