/** @format */

import express from "express";
import { Request, Response } from "express";
import productRoutes from "./productRoutes";
import userRoutes from "./userRoutes";
import orderRoutes from "./orderRoutes";
import paymentRoutes from "./paymentInitRoute";
import reviewRoutes from "./reviewRoutes";
import shippingAddressRoutes from "./shippingAddressRoutes";
const router = express.Router();
import { requireAuth } from "@clerk/express";
import { unauthorized } from "../utils/request";
const unauthorizedHandler = (req: Request, res: Response) => {
    return res.status(401).json({ message: "Unauthorized" });
};
//TODO: implement auth middleware
router.use("/api/products", productRoutes);
router.use("/api/payment", paymentRoutes);
router.use("/api/users", /*  requireAuth(), */ userRoutes);
router.use("/api/orders", /*  requireAuth(), */ orderRoutes);
router.use("/api/reviews", /*  requireAuth(), */ reviewRoutes);

router.use("/api/shipping-addresses", requireAuth(), shippingAddressRoutes);

export default router;
