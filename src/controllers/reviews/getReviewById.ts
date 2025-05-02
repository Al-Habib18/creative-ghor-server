/** @format */

import { Request, Response } from "express";

import { getReviewById as findReviewById } from "../../services/reviews";

const getReviewById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        //TODO: validate id
        const review = await findReviewById(id);
        if (!review) {
            return res.status(404).json({ message: "No review found" });
        }
        return res
            .status(200)
            .json({ message: "Review retive successfully", data: review });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default getReviewById;
