const express = require("express");
const mongoose = require("mongoose");
const dotenv  = require("dotenv");
const tokenRoutes = require("./routes/token");
const hitToken = require("./routes/hitToken")
const shorten = require("./routes/shorten");
const unshorten = require("./routes/unshorten");

const app = express();
dotenv.config();

app.use(express.json());

const dbURI = process.env.MONGODB_URI;

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
app.get("/", (req, res)=>{
  res.status(201).json({msg : "Api is Up & Working!"});
})
app.use("/token", tokenRoutes);
app.use("/request", hitToken);
app.use("/shorten", shorten);
app.use("/s", unshorten);