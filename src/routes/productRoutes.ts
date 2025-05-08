/** @format */

/** @format */

import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    getAllReviewsOfProduct,
} from "../controllers/products/index";
import upload from "../middleware/multer";

import { requireAuth } from "@clerk/express";

const router = require("express").Router();

//TODO: protect all routes
router.get("/", getAllProducts); // public route
router.post("/", upload.single("image"), /* requireAuth(), */ createProduct);

router.get("/:id", getProductById); // public route

router.put(
    "/:id",
    upload.single("image"),
    /* requireAuth(), */ updateProductById
);
router.delete("/:id", /* requireAuth(),  */ deleteProductById);

router.get("/:id/reviews", getAllReviewsOfProduct); // public route

export default router;
