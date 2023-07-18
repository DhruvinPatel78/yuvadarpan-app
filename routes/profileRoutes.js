import express from "express";
const router = express.Router();
import {
  createProfile,
  deleteProfile,
  getAllProfile,
  updateProfile,
  showStats,
} from "../controller/profileController.js";

router.route("/").post(createProfile).get(getAllProfile);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteProfile).patch(updateProfile);

export default router;
