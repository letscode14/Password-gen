import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { router } from "./Routes/routes.js";
import connectDB from "./Config/config.js";

config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

app.use("/api/", router);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.json({
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log(`Server listening on the port ${process.env.PORT}`);
});
