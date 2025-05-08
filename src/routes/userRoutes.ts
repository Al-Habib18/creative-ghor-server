/** @format */

import express from "express";
import {
    getAllProductsOfUser,
    getShippingAddressOfUser,
    updateUserController,
} from "../controllers/users/index";

const router = express.Router();

router.get("/:id/products", getAllProductsOfUser);
router.get("/:id/shipping-addresses", getShippingAddressOfUser);
router.put("/clerk/:id", updateUserController);

export default router;
