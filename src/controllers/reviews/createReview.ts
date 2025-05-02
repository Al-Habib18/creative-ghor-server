/** @format */

import { Request, Response } from "express";
import { createReview as createNewReview } from "../../services/reviews";

const createReview = async (req: Request, res: Response) => {
    try {
        //TODO: validate request boyd
        const review = await createNewReview(req.body);
        return res.status(200).json({
            message: "Review created successfully",
            data: review,
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default createReview;
