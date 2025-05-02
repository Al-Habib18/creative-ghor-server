/** @format */

import express from "express";
import {
    createReview,
    deleteReviewById,
    getReviewById,
    updateReviewById,
} from "../controllers/reviews/index";

const router = express.Router();

router.post("/", createReview);

router.get("/:id", getReviewById);
router.put("/:id", updateReviewById);
router.delete("/:id", deleteReviewById);

export default router;
