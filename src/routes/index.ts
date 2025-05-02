/** @format */

import express from "express";
import productRoutes from "./productRoutes";
import userRoutes from "./userRoutes";
import orderRoutes from "./orderRoutes";
import paymentRoutes from "./paymentRoutes";
import reviewRoutes from "./reviewRoutes";
import shippingAddressRoutes from "./shippingAddressRoutes";
const router = express.Router();

router.use("/api/products", productRoutes);
router.use("/api/users", userRoutes);
router.use("/api/orders", orderRoutes);
router.use("/api/payment", paymentRoutes);
router.use("/api/reviews", reviewRoutes);
router.use("/api/shipping-addresses", shippingAddressRoutes);

export default router;
