import Country from "../models/Country.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const getAllCountry = async (req, res) => {
  try {
    const countries = await Country.find({});
    // const count = await Country.countDocuments();
    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Countries data",
      // total: count,
      data: countries,
    });
  } catch (e) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: e.message, data: [] });
  }
};
const createCountry = async (req, res) => {
  const { name, short_name } = req.body;
  if (!name || !short_name) {
    throw new BadRequestError("please provide all values");
  }
  const countryAlreadyExists = await Country.findOne({ name });
  const countryShortNameAlreadyExists = await Country.findOne({ short_name });
  if (countryAlreadyExists) {
    throw new BadRequestError("Country Already Exists");
  }
  if (countryShortNameAlreadyExists) {
    throw new BadRequestError("Country Short Name Already Exists");
  }
  await Country.create({
    name,
    short_name,
  });
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Country Created Successfully" });
};
const updateCountry = async (req, res) => {
  const { id: countryId } = req.params;
  const { name, short_name } = req.body;
  if (!name || !short_name) {
    throw new BadRequestError("Please provide all values");
  }
  const country = await Country.findOne({ _id: countryId });
  if (!country) {
    throw new NotFoundError(`No Country with id :${countryId}`);
  }
  req.body.updatedBy = countryId;
  await Country.findOneAndUpdate({ _id: countryId }, req.body, {
    new: true,
    runValidators: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Country Updated Successfully" });
};
const deleteCountry = async (req, res) => {
  const { id: countryId } = req.params;
  const country = await Country.findOne({ _id: countryId });
  if (!country) {
    throw new NotFoundError(`No Country with id :${countryId}`);
  }
  await Country.findOneAndRemove({ _id: countryId });
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Country Deleted Successfully" });
};

export { getAllCountry, createCountry, updateCountry, deleteCountry };
