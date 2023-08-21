import mongoose from "mongoose";
const StateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  country_short_name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    default: "64cce44ceec38bfc4aa58078",
  },
  updatedBy: {
    type: String,
    default: "64cce44ceec38bfc4aa58078",
  },
});

export default mongoose.model("State", StateSchema);
