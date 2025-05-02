/** @format */

import prisma from "../schemas/prisma";

export const getAllReviewsOfProduct = async (id: string) => {
    const reviews = await prisma.review.findMany({ where: { productId: id } });
    return reviews;
};

export const createReview = async (data: any) => {
    const review = await prisma.review.create({ data });
    return review;
};

export const updateReviewById = async (id: string, data: any) => {
    const review = await prisma.review.update({ where: { id }, data });
    return review;
};

export const deleteReviewById = async (id: string) => {
    const review = await prisma.review.delete({ where: { id } });
    return review;
};

export const getReviewById = async (id: string) => {
    const review = await prisma.review.findUnique({ where: { id } });
    return review;
};

export const getAllReviews = async () => {
    const reviews = await prisma.review.findMany();
    return reviews;
};
