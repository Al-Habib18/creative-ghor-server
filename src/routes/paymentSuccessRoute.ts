/** @format */

import express from "express";
import { successController } from "../controllers/payments";

const router = express.Router();
router.use("/api/payment/success/:id", successController);
export default router;
