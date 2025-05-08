/** @format */

import { Request, Response } from "express";
import { getOrderById as findProductById } from "../../services/orders";
import { updateOrderById as updateOrder } from "../../services/orders";
import { badRequest } from "../../utils/request";
import { idSchema, updateOrderSchema } from "../../schemas/index";

const updateOrderById = async (req: Request, res: Response) => {
    try {
        const { paymentStatus, orderStatus } = req.body;

        const id = req.params.id;
        if (!id) return badRequest(res, "No order id found");

        const result = idSchema.safeParse(id);
        if (!result.success) return badRequest(res, result.error.message);

        if (!paymentStatus || !orderStatus)
            return badRequest(res, "No paymentStatus or orderStatus found");

        const result2 = updateOrderSchema.safeParse(req.body);
        if (!result2.success) return badRequest(res, result2.error.message);

        const product = await findProductById(id);

        if (!product) {
            return res.status(404).json({ message: "No order found" });
        }

        const data = req.body;
        const updatedProduct = await updateOrder(id, data);

        res.status(200).json({
            message: "A order updated Successfully",
            data: updatedProduct,
        });
    } catch (err) {
        console.log("error in updating product by id", err);
        res.status(500).json({ messge: "Internal Server Error", err });
    }
};

export default updateOrderById;
