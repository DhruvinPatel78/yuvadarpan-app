import "express-async-errors";
// import cors from "cors";
import express from "express";

const app = express();
import dotenv from "dotenv";

dotenv.config();
import authRouter from "./routes/authRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import cityRouter from "./routes/cityRoutes.js";
import regionRouter from "./routes/regionRoutes.js";
import countryRouter from "./routes/countryRoutes.js";
import stateRouter from "./routes/stateRoutes.js";
import notFoundMiddleware from "./middleware/not-found.js";

import errorHandlerMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
// app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome!" });
});
app.get("/api/v1", (req, res) => {
  res.json({ msg: "API!" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profiles", profileRouter);
app.use("/api/v1/city", cityRouter);
app.use("/api/v1/region", regionRouter);
app.use("/api/v1/country", countryRouter);
app.use("/api/v1/state", stateRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Sever is Running ${port} ....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
