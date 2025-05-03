/** @format */

import express from "express";
import productRoutes from "./productRoutes";
import userRoutes from "./userRoutes";
import orderRoutes from "./orderRoutes";
import paymentRoutes from "./paymentRoutes";
import reviewRoutes from "./reviewRoutes";
import shippingAddressRoutes from "./shippingAddressRoutes";
const router = express.Router();

import paymentController from "../controllers/payment";

router.use("/api/products", productRoutes);
router.use("/api/users", userRoutes);
router.use("/api/orders", orderRoutes);
router.use("/api/payment", paymentRoutes);
router.use("/api/reviews", reviewRoutes);
router.use("/api/shipping-addresses", shippingAddressRoutes);

router.post("/api/ssl-request", paymentController);

export default router;
