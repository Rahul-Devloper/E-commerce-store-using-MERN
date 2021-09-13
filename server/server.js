const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//app
const app = express();

//db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    //in MOngoose 6.0 or later, the below usecreate
    //& useFind are no longer supported
    // useCreateIndex: true,
    // useFindAndModify: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("DB connection ERROR", error);
  });

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// routes
app.get("/api", (req, res) => {
  res.json({
    data: "Hey this is the Node API and running",
  });
});

//port

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
