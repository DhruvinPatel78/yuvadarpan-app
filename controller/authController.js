import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const {
    name,
    email,
    password,
    lastName,
    middleName,
    dob,
    familyId,
    state,
    district,
    region,
    localSamaj,
    mobile,
    city,
  } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !lastName ||
    !middleName ||
    !dob ||
    !familyId ||
    !state ||
    !district ||
    !region ||
    !localSamaj ||
    !mobile ||
    !city
  ) {
    throw new BadRequestError("please provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create({
    name,
    email,
    password,
    lastName,
    middleName,
    dob,
    familyId,
    state,
    district,
    region,
    localSamaj,
    mobile,
    city,
  });
  const token = user?.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      city: user.city,
      name: user.name,
      middleName: user.middleName,
      mobile: user.mobile,
      familyId: user.familyId,
      dob: user.dob,
      state: user.state,
      district: user.district,
      region: user.region,
      localSamaj: user.localSamaj,
    },
    token,
    city: user.city,
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user?.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, city: user.city });
};
const updateUser = async (req, res) => {
  res.send("updateUser user");
};

export { login, register, updateUser };
