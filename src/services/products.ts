/** @format */

import { defaults } from "../config/defaults";
import prisma from "../schemas/prisma";
import { Category } from "@prisma/client";

export const getAllProducts = async (data: {
    limit?: number | undefined;
    page?: number | undefined;
    sortType?: "asc" | "desc" | undefined;
    category?: Category | undefined;
}) => {
    if (data.page === undefined) data.page = defaults.page;
    if (data.limit === undefined) data.limit = defaults.limit;
    if (data.category === undefined) data.category = undefined; // TODO: remove later
    if (data.sortType === undefined) data.sortType = undefined; // price low high or high to low

    const products = await prisma.product.findMany({
        skip: (data.page - 1) * data.limit,
        take: data.limit,
        orderBy: { price: data.sortType },
        where: { category: data.category },
    });
    return products;
};

export const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({ where: { id } });
    return product;
};

export const createProduct = async (data: any) => {
    const product = await prisma.product.create({ data });
    return product;
};

export const updateProductById = async (id: string, data: any) => {
    const product = await prisma.product.update({ where: { id }, data });
    return product;
};

export const deleteProductById = async (id: string) => {
    const product = await prisma.product.delete({ where: { id } });
    return product;
};
