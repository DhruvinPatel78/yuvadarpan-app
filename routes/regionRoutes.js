import express from "express";
const router = express.Router();
import {
  getAllRegion,
  createRegion,
  updateRegion,
  deleteRegion,
} from "../controller/regionController.js";

router.route("/").post(createRegion).get(getAllRegion);
router.route("/:id").delete(deleteRegion).patch(updateRegion);

export default router;
