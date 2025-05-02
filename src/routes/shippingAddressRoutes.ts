/** @format */

import express from "express";
import {
    createShippingAddress,
    getShippingAddressById,
    updateShippingAddressById,
    deleteShippingAddressById,
} from "../controllers/shippingAddress/index";

const router = express.Router();

router.post("/", createShippingAddress);

router.get("/:id", getShippingAddressById);
router.put("/:id", updateShippingAddressById);
router.delete("/:id", deleteShippingAddressById);

export default router;
