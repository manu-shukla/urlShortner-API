const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const tokenRoutes = require("./routes/token");
const hitToken = require("./routes/hitToken")
const shorten = require("./routes/shorten");
const unshorten = require("./routes/unshorten");

const app = express();

app.use(express.json());

const dbURI = "mongodb://localhost:27017/Api";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(3000);
    console.log("Server is running");
  })
  .catch((err) => console.log(err));

app.use("/token", tokenRoutes);
app.use("/request", hitToken);
app.use("/shorten", shorten);
app.use("/s", unshorten);