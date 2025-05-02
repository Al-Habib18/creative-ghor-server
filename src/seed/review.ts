/** @format */

import prisma from "../schemas/prisma";
const seedReviews = async () => {
    await prisma.review.createMany({
        data: [
            {
                id: "rev_1",
                userId: "user_2",
                productId: "prod_1",
                rating: 5,
                comment: "Excellent product! Highly recommend.",
                image: null,
            },
            {
                id: "rev_2",
                userId: "user_3",
                productId: "prod_1",
                rating: 4,
                comment: "Works well, but could be smoother.",
                image: null,
            },
            {
                id: "rev_3",
                userId: "user_2",
                productId: "prod_2",
                rating: 5,
                comment: "Great shoes! Very comfortable.",
                image: null,
            },
        ],
    });
};

export default seedReviews;
