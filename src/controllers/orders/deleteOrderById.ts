/** @format */

import { Request, Response } from "express";

/** @format */

import { getOrderById as findProductById } from "../../services/orders";
import { deleteOrderById as deleteOrder } from "../../services/orders";

const deleteOrderById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        //TODO: validtae id
        //TODO: validate body

        const product = await findProductById(id);

        if (!product) {
            return res.status(404).json({ message: "No Order found" });
        }

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
