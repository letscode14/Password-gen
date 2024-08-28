import mongoose from "mongoose";

export default async function connectDB() {
  mongoose.connect(process.env.MONGOOSE_URI).then(() => {
    console.log("database connected successfully");
  });
}
