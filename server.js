require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.f3phq5z.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose.connect(uri, connectionParams);

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connetion"));

app.use(express.json());

const subscribersRouter = require("./routes/subscribers");
app.use("/subscribers", subscribersRouter);

app.listen(3000, () => {
  console.log("Started");
});
