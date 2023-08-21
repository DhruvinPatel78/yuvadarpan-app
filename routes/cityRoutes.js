import express from "express";
const router = express.Router();
import {
  getAllCity,
  createCity,
  updateCity,
  deleteCity,
} from "../controller/cityController.js";

router.route("/").post(createCity).get(getAllCity);
router.route("/:id").delete(deleteCity).patch(updateCity);

export default router;
