/** @format */

import { Request, Response } from "express";

import { updateReviewById as updateReview } from "../../services/reviews";
import { getReviewById as findReviewById } from "../../services/reviews";

const updateReviewById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const review = await findReviewById(id);
        if (!review) {
            return res.status(404).json({ message: "No review found" });
        }
        //TODO: validate id
        const updatedReview = await updateReview(id, req.body);
        return res.status(200).json({
            message: "Review updated successfully",
            data: review,
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default updateReviewById;
