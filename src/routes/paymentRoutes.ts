/** @format */

import express from "express";
import {
    successController,
    paymentInitController,
} from "../controllers/payments/index";
import { requireAuth } from "@clerk/express";
const router = express.Router();

router.post("/init", requireAuth(), paymentInitController);
router.post("/fail", (req, res) => res.json({ message: "fail" }));
router.post("/cancel", (req, res) => res.json({ message: "cancel" }));

export default router;
