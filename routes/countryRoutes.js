import express from "express";
const router = express.Router();
import {
  getAllCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} from "../controller/countryController.js";

router.route("/").post(createCountry).get(getAllCountry);
router.route("/:id").delete(deleteCountry).patch(updateCountry);

export default router;
