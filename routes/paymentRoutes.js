import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { cancelSubscription, createSubscription, getRazorPayKey, paymentVerification } from "../controllers/paymentController.js";

const router = express.Router();

router.route("/subscribe").get(isAuthenticated,createSubscription);

router.route("/payment-verification").post(isAuthenticated,paymentVerification);

router.route("/razorpay-key").get(getRazorPayKey);

router.route("/subscription/cancel").delete(isAuthenticated,cancelSubscription);

export default router;