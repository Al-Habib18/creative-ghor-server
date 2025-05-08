/** @format */

import { Request, Response } from "express";

/** @format */

import { getOrderById } from "../../services/orders";
import { deleteOrderById as deleteOrder } from "../../services/orders";
import { badRequest, notFound } from "../../utils/request";
import { idSchema } from "../../schemas/index";

const deleteOrderById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) return badRequest(res, "No order id found");

        const result = idSchema.safeParse(id);
        if (!result.success) return badRequest(res, result.error.message);

        const order = await getOrderById(id);
        if (!order) notFound(res, "No order found");

        // delete order
        await deleteOrder(id);

        res.status(200).json({
            message: "A Product updated Successfully",
        });
    } catch (err) {
        console.log("error in deleting product by id", err);
        res.status(500).json({ messge: "Internal Server Error", err });
    }
};

export default deleteOrderById;
