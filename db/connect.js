import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url, {
    dbName: "Yuvadarpan",
  });
};

export default connectDB;
