/** @format */

import prisma from "../schemas/prisma";
import { PaymentStatus } from "@prisma/client";
import { getOrderById } from "./orders";

const createPayment = async (orderId: string) => {
    const order = await getOrderById(orderId);

    if (!order) {
        throw new Error(`Order with id ${orderId} not found`);
    }

    const data = {
        orderId,
        paymentStatus: PaymentStatus.PAID,
        amount: order.totalAmount,
        currency: "BDT",
        transactionId: orderId,
        paymentMethod: "bKash",
        paymentDate: new Date(),
    };

    const payment = await prisma.payment.create({ data });
    return payment;
};

export { createPayment };
