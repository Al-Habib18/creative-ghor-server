/** @format */

import { Request, Response } from "express";
import { getAllReviewsOfProduct as allReviewsOfProduct } from "../../services/reviews";

const getAllReviewsOfProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const reviews = await allReviewsOfProduct(id);

        if (!reviews) {
            return res.status(404).json({ message: "No reviews found" });
        }

        res.status(200).json({
            message: "All reviews of product",
            data: reviews,
        });
    } catch (err) {
        console.log("error in getting all reviews of product", err);
        res.status(500).json({ messge: "Internal Server Error", err });
    }
};

export default getAllReviewsOfProduct;
