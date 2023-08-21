import Region from "../models/Region.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const getAllRegion = async (req, res) => {
  try {
    const { state_name } = req.body;
    if (!state_name) {
      new BadRequestError("please provide all values");
    }
    const region = await Region.find({ state_name });
    res
      .status(StatusCodes.OK)
      .json({ success: true, msg: "Regions data", data: region });
  } catch (e) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: e.message, data: [] });
  }
};
const createRegion = async (req, res) => {
  const { name, state_name } = req.body;
  if (!name || !state_name) {
    throw new BadRequestError("please provide all values");
  }
  const regionAlreadyExists = await Region.findOne({ name });
  if (regionAlreadyExists) {
    throw new BadRequestError("Region Already Exists");
  }
  await Region.create({
    name,
    state_name,
  });
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Region Created Successfully" });
};
const updateRegion = async (req, res) => {
  const { id: regionId } = req.params;
  const { name, state_name } = req.body;
  if (!name || !state_name) {
    throw new BadRequestError("Please provide all values");
  }
  const region = await Region.findOne({ _id: regionId });
  if (!region) {
    throw new NotFoundError(`No Region with id :${regionId}`);
  }
  req.body.updatedBy = regionId;
  await Region.findOneAndUpdate({ _id: regionId }, req.body, {
    new: true,
    runValidators: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Region Updated Successfully" });
};
const deleteRegion = async (req, res) => {
  const { id: regionId } = req.params;
  const region = await Region.findOne({ _id: regionId });
  if (!region) {
    throw new NotFoundError(`No Region with id :${regionId}`);
  }
  await Region.findOneAndRemove({ _id: regionId });
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Region Deleted Successfully" });
};
export { getAllRegion, createRegion, updateRegion, deleteRegion };
