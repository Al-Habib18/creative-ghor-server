/** @format */

import { Request, Response } from "express";
import { createOrder as createNewOrder } from "../../services/orders";
import { getAuth } from "@clerk/express";
import { OrderSchema } from "../../schemas/index";
import { badRequest } from "../../utils/request";

const createOrder = async (req: Request, res: Response) => {
    try {
        if (!req.body) return badRequest(res, "No body found");

        const { shippingAddressId, productIds, quantity, totalAmount } =
            req.body;

        const { userId } = getAuth(req);
        if (!userId) return badRequest(res, "Unauthorized");

        const data = {
            userId,
            shippingAddressId,
            productIds,
            quantity,
            totalAmount,
        };

        const result = OrderSchema.safeParse(data);

        if (!result.success) return badRequest(res, result.error.message);

        if (result.data.productIds.length === 0)
            return badRequest(res, "No product found");

        const order = await createNewOrder(data);

        return res.status(200).json({
            message: "Order created Successfully",
            data: order,
        });
    } catch (err) {
        console.error("error in creating order", err);
        return res.status(500).json({ message: "Internal Server Error", err });
    }
};

export default createOrder;
