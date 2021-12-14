import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const main = async () => {
  console.log(`Connecting to DB @ mongodb://localhost:27017/auth`);
  await mongoose.connect(`mongodb://localhost:27017/auth`);
};

main()
  .then(() => console.log(`Connected to DB`))
  .catch((err) => console.log(err));

app.listen(4000, () => console.log("Server started"));
