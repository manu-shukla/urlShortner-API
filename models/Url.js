const mongoose = require("mongoose");
const { isURL } = require("validator");


const urlSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
    validate: [isURL, "Please enter a valid URL"],
  },
  shortner: {
    type: String,
    required: true,
    minlength : [5, "Enter a min length shortner of 5 characters"],
    unique: true
  },
});

const Url = mongoose.model("url", urlSchema);

module.exports = Url;
