import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  state_name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    default: "64c5ce44cec38bfc4aa58078",
  },
  updatedBy: {
    type: String,
    default: "64c5ce44cec38bfc4aa58078",
  },
});

export default mongoose.model("Region", UserSchema);
