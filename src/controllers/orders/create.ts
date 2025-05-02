/** @format */

import { Request, Response } from "express";
import { createOrder as createNewOrder } from "../../services/orders";

const createOrder = async (req: Request, res: Response) => {
    try {
        //TODO: validate data
        //TODO: check permission

        const data = req.body;

        const order = await createNewOrder(data);

        res.status(200).json({
            message: "Order created Successfully",
            data: order,
        });
    } catch (err) {
        console.log("error in creating order", err);
        res.status(500).json({ messge: "Internal Server Error", err });
    }
};

export default createOrder;
