/** @format */

import { Request, Response } from "express";
import { getOrderById as findOrderById } from "../../services/orders";

const getOrderById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        //TODO: validtae id

        const product = await findOrderById(id);

        if (!product) {
            return res.status(404).json({ message: "No order found" });
        }

        res.status(200).json({
            message: "Order retive Successfully",
            data: product,
        });
    } catch (err) {
        console.log("error in getting order by id", err);
        res.status(500).json({ messge: "Internal Server Error", err });
    }
};

export default getOrderById;
