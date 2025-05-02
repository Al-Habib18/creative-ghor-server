/** @format */

import express from "express";
import {
    getAllProductsOfUser,
    getShippingAddressOfUser,
} from "../controllers/users/index";

const router = express.Router();

router.get("/:id/products", getAllProductsOfUser);
router.get("/:id/shipping-addresses", getShippingAddressOfUser);

export default router;
