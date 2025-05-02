/** @format */

import { OrderStatus, PaymentStatus } from "@prisma/client";
import prisma from "../schemas/prisma";

const seedOrders = async () => {
    await prisma.order.createMany({
        data: [
            {
                id: "1",
                userId: "user_1",
                shippingAddressId: "addr_1",
                productId: ["prod_1", "prod_2"],
                quantity: 2,
                totalAmount: 20.99,
                orderStatus: OrderStatus.SHIPPED,
                provider: "bKash",
                paymentStatus: PaymentStatus.PAID,
            },
            {
                id: "2",
                userId: "user_2",
                shippingAddressId: "addr_2",
                productId: ["prod_3", "prod_4"],
                quantity: 2,
                totalAmount: 49.99,
                orderStatus: OrderStatus.PENDING,
                provider: "Nagad",
                paymentStatus: PaymentStatus.UNPAID,
            },
        ],
    });
};

export default seedOrders;
