/** @format */

import { Request, Response } from "express";

import { deleteReviewById as deleteReview } from "../../services/reviews";

const deleteReviewById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        //TODO: validate id
        await deleteReview(id);
        return res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.log("error in deleting review by id", error);
        return res.status(500).json({ error });
    }
};

export default deleteReviewById;
