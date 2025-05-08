/** @format */

import express from "express";
import { paymentInitController } from "../controllers/payments/index";
import { requireAuth } from "@clerk/express";
const router = express.Router();

router.post("/init", requireAuth(), paymentInitController);

export default router;
