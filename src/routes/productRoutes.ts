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

const router = require("express").Router();

router.get("/", getAllProducts);
router.post("/", upload.single("image"), createProduct);

router.get("/:id", getProductById);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

router.get("/:id/reviews", getAllReviewsOfProduct);

export default router;
