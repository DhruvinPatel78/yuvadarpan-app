import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  middleName: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "middleName",
  },
  lastName: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "lastName",
  },
  mobile: {
    type: String,
    required: [true, "Please provide Mobile Number"],
    trim: true,
    match: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  },
  dob: {
    type: Date,
    required: [true, "Please provide Date of Birth"],
    trim: true,
    default: Date.now(),
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator?.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
    select: false,
  },
  familyId: {
    type: String,
    required: [true, "Please provide Family Id"],
    maxLength: 20,
    trim: true,
    default: "lastName",
  },
  city: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "my city",
  },
  state: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "my state",
  },
  district: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "my district",
  },
  region: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "my region",
  },
  localSamaj: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "my local samaj",
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", UserSchema);
