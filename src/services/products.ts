/** @format */

import prisma from "../schemas/prisma";

export const getAllProducts = async () => {
    const products = await prisma.product.findMany();
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
