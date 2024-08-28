import express from "express";
import { config } from "dotenv";

config();

const app = express();

app.listen(3000, () => {
  console.log(`Server listening on the port ${process.env.PORT}`);
});
