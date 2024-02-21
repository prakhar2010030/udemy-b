import express from "express";
import { getStats } from "../controllers/dashboardController.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/stats").get(isAuthenticated, authorizedAdmin, getStats);

export default router;
