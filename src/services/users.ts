/** @format */

import prisma from "../schemas/prisma";
import getAllProducts from "../controllers/products/getAllProducts";

export const getAllProductsOfUser = async (id: string) => {
    const products = await prisma.product.findMany({ where: { userId: id } });
    return products;
};
