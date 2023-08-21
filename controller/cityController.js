import City from "../models/City.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const getAllCity = async (req, res) => {
  try {
    const { region_name } = req.body;
    // const pageNumber = req.query?.page || 1; // Get the current page number from the query parameters
    // const pageSize = 10; // Number of items per page
    if (!region_name) {
      new BadRequestError("please provide all values");
    }
    // const city = await City.find({ region_name }).sort({ name: 1 }); // shorting data in asc using 1 and desc using -1

    // const city = await City.find({ region_name }).sort({
    //   // name: "desc",
    //   name: "asc",
    // }); // Shorting data passing asc and desc

    // const city = await City.find({ region_name })
    //   .limit(pageSize)
    //   .skip((pageSize - 1) * pageNumber); // display only that data using pageNumber and pageSize using limit and skip

    const city = await City.find({ region_name });

    // const city = await City.find({ region_name }, { name: 1 }); // display only name field

    // const count = await City.countDocuments(); // get total data count
    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Cities data",
      // totalPages: count, // display total page data count
      // currentPage: pageNumber, // display current pageNumber
      data: city,
    });
  } catch (e) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: e.message, data: [] });
  }
};
const createCity = async (req, res) => {
  const { name, region_name } = req.body;
  if (!name || !region_name) {
    throw new BadRequestError("please provide all values");
  }
  const cityAlreadyExists = await City.findOne({ name });
  if (cityAlreadyExists) {
    throw new BadRequestError("City Already Exists");
  }
  await City.create({
    name,
    region_name,
  });
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "City Created Successfully" });
};
const updateCity = async (req, res) => {
  const { id: cityId } = req.params;
  const { name, region_name } = req.body;
  if (!name || !region_name) {
    throw new BadRequestError("Please provide all values");
  }
  const city = await City.findOne({ _id: cityId });
  if (!city) {
    throw new NotFoundError(`No City with id :${cityId}`);
  }
  req.body.updatedBy = cityId;
  await City.findOneAndUpdate({ _id: cityId }, req.body, {
    new: true,
    runValidators: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "City Updated Successfully" });
};
const deleteCity = async (req, res) => {
  const { id: cityId } = req.params;
  const city = await City.findOne({ _id: cityId });
  if (!city) {
    throw new NotFoundError(`No City with id :${cityId}`);
  }
  await City.findOneAndRemove({ _id: cityId });
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "City Deleted Successfully" });
};
export { getAllCity, createCity, updateCity, deleteCity };
