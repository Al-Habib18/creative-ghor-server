/** @format */

import prisma from "../schemas/prisma";
import { PaymentStatus, OrderStatus } from "@prisma/client";
import { defaults } from "../config/defaults";

export const createOrder = async (data: any) => {
    const order = await prisma.order.create({ data });
    return order;
};

export const getAllOrders = async (data: {
    page?: number;
    limit?: number;
    orderStatus?: OrderStatus;
    paymentStatus?: PaymentStatus;
}) => {
    if (data.page === undefined) data.page = defaults.page;
    if (data.limit === undefined) data.limit = defaults.limit;

    const orders = await prisma.order.findMany({
        skip: (data.page - 1) * data.limit,
        take: data.limit,
        where: {
            orderStatus: data.orderStatus,
            paymentStatus: data.paymentStatus,
        },
    });

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

export const getAllOrdersOfUser = async (id: string) => {
    const orders = await prisma.order.findMany({ where: { userId: id } });
    return orders;
};

export const updatePaymentStatusOfOrderById = async (
    id: string,
    paymentStatus: PaymentStatus
) => {
    const existingOrder = await prisma.order.findUnique({ where: { id } });

    if (!existingOrder) {
        throw new Error(`Order with id ${id} not found`);
    }

    const updated = await prisma.order.update({
        where: { id },
        data: { paymentStatus },
    });

    return updated;
};
