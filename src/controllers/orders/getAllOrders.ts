/** @format */

import { Request, Response } from "express";
import { getAllOrders as getListOfOrders } from "../../services/orders";
import { defaults } from "../../config/defaults";
import { OrderStatus, PaymentStatus } from "@prisma/client";
import getPagination from "../../utils/pagination";

const getAllOrders = async (req: Request, res: Response) => {
    let { page, limit, orderStatus, paymentStatus } = req.query;

    try {
        console.log("req.query:-", req.query);

        const Limit = Number(limit) || defaults.limit;
        const Page = Number(page) || defaults.page;

        // Validate enum values
        const validOrderStatuses = Object.values(OrderStatus);
        const validPaymentStatuses = Object.values(PaymentStatus);

        const OrderStatusFilter =
            typeof orderStatus === "string" &&
            validOrderStatuses.includes(orderStatus as OrderStatus)
                ? (orderStatus as OrderStatus)
                : undefined;

        const PaymentStatusFilter =
            typeof paymentStatus === "string" &&
            validPaymentStatuses.includes(paymentStatus as PaymentStatus)
                ? (paymentStatus as PaymentStatus)
                : undefined;

        const orders = await getListOfOrders({
            limit: Limit,
            page: Page,
            orderStatus: OrderStatusFilter,
            paymentStatus: PaymentStatusFilter,
        });

        if (!orders) {
            return res.status(404).json({ message: "No order found" });
        }

        const totalItems = orders.length;
        const pagination = getPagination(totalItems, Limit, Page);

        res.status(200).json({
            message: "A List of orders retrieved successfully",
            data: orders,
            pagination,
        });
    } catch (err) {
        console.error("Error in getting all orders", err);
        res.status(500).json({ message: "Internal Server Error", err });
    }
};

export default getAllOrders;
