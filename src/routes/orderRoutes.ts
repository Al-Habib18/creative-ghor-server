/** @format */

import express from "express";
import {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderById,
    deleteOrderById,
} from "../controllers/orders/index";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.get("/", getAllOrders);
router.post("/", requireAuth(), createOrder);

router.get("/:id", getOrderById);
router.put("/:id", updateOrderById);
router.delete("/:id", deleteOrderById);

export default router;
