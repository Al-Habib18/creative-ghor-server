/** @format */

import express from "express";
import {
    paymentSuccessController,
    paymentFailController,
} from "../controllers/payments";

const router = express.Router();
router.use("/api/payment/success/:id", paymentSuccessController);
router.post("/api/payment/fail/:id", paymentFailController);

export default router;
