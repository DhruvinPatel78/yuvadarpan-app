import State from "../models/State.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const getAllState = async (req, res) => {
  try {
    const { country_code } = req.body;
    if (!country_code) {
      new BadRequestError("please provide all values");
    }
    const States = await State.find({
      country_short_name: country_code,
    });
    res
      .status(StatusCodes.OK)
      .json({ success: true, msg: "States data", data: States });
  } catch (e) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: e.message, data: [] });
  }
};
const createState = async (req, res) => {
  const { name, country_short_name } = req.body;
  if (!name || !country_short_name) {
    throw new BadRequestError("please provide all values");
  }
  const stateAlreadyExists = await State.findOne({ name });
  if (stateAlreadyExists) {
    throw new BadRequestError("State Already Exists");
  }
  await State.create({
    name,
    country_short_name,
  });
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "State Created Successfully" });
};
const updateState = async (req, res) => {
  const { id: stateId } = req.params;
  const { name, country_short_name } = req.body;
  if (!name || !country_short_name) {
    throw new BadRequestError("Please provide all values");
  }
  const state = await State.findOne({ _id: stateId });
  if (!state) {
    throw new NotFoundError(`No State with id :${stateId}`);
  }
  req.body.updatedBy = stateId;
  await State.findOneAndUpdate({ _id: stateId }, req.body, {
    new: true,
    runValidators: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "State Updated Successfully" });
};
const deleteState = async (req, res) => {
  const { id: stateId } = req.params;
  const state = await State.findOne({ _id: stateId });
  if (!state) {
    throw new NotFoundError(`No Country with id :${stateId}`);
  }
  await State.findOneAndRemove({ _id: stateId });
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "State Deleted Successfully" });
};

export { getAllState, createState, updateState, deleteState };
