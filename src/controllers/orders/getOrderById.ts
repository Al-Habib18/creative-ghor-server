/** @format */

import { Request, Response } from "express";
import { getOrderById as findOrderById } from "../../services/orders";
import { badRequest, notFound } from "../../utils/request";
import { idSchema } from "../../schemas/index";

const getOrderById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) return badRequest(res, "No order id found");

        const result = idSchema.safeParse(id);
        if (!result.success) return badRequest(res, result.error.message);

        const order = await findOrderById(id);

        if (!order) notFound(res, "No order found");

        res.status(200).json({
            message: "Order retrived Successfully",
            data: order,
        });
    } catch (err) {
        console.log("error in getting order by id", err);
        res.status(500).json({ messge: "Internal Server Error", err });
    }
};

export default getOrderById;
