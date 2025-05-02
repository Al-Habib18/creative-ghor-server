/** @format */

import { Request, Response } from "express";
import { getOrderById as findProductById } from "../../services/orders";
import { updateOrderById as updateOrder } from "../../services/orders";

const updateOrderById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        //TODO: validtae id

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
