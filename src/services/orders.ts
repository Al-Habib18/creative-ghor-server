/** @format */

import prisma from "../schemas/prisma";

export const createOrder = async (data: any) => {
    const order = await prisma.order.create({ data });
    return order;
};

export const getAllOrders = async () => {
    const orders = await prisma.order.findMany();
    return orders;
};

export const getOrderById = async (id: string) => {
    const order = await prisma.order.findUnique({ where: { id } });
    return order;
};

export const updateOrderById = async (id: string, data: any) => {
    const order = await prisma.order.update({ where: { id }, data });
    return order;
};

export const deleteOrderById = async (id: string) => {
    const order = await prisma.order.delete({ where: { id } });
    return order;
};
