import express from "express";
const router = express.Router();
import {
  getAllState,
  createState,
  updateState,
  deleteState,
} from "../controller/stateController.js";

router.route("/").post(createState).get(getAllState);
router.route("/:id").delete(deleteState).patch(updateState);

export default router;
