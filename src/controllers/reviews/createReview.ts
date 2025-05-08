/** @format */

import { Request, Response } from "express";
import { createReview as createNewReview } from "../../services/reviews";
import { ReviewSchema } from "../../schemas";
import { badRequest } from "../../utils/request";
import { getAuth } from "@clerk/express";

const createReview = async (req: Request, res: Response) => {
    try {
        if (!req.body) return badRequest(res, "No body found");

        if (!req.body.productId)
            return badRequest(res, "No productId or userId found");
        const user = getAuth(req);
        if (!user) return badRequest(res, "Unauthorized");

        const data = {
            ...req.body,
            userId: user.userId,
        };
        const result = ReviewSchema.safeParse(data);
        if (!result.success) return badRequest(res, result.error.message);

        const review = await createNewReview(result.data);

        return res.status(200).json({
            message: "Review created successfully",
            data: review,
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default createReview;
