require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const mainRouter = require("./src/api/routes/mainRouter");

const PORT = 3000;
const app = express();

connectDB();

app.use(express.json());

app.use("/api/v1", mainRouter);

app.use("*", (req, res, next) => {
  return res.status(400).json("Route not found ⚡️⚡️");
});

app.listen(PORT, () => {
  console.log(`"http://localhost:${PORT}"`);
});
