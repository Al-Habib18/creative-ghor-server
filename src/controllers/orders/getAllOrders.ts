/** @format */

import { Request, Response } from "express";
import { getAllOrders as getListOfOrders } from "../../services/orders";

const getAllOrders = async (req: Request, res: Response) => {
    //TODO: validate request body
    try {
        const products = await getListOfOrders();

        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json({
            message: "A List of orders retive Successfully",
            data: products,
        });
    } catch (err) {
        console.log("error in getting all orders", err);
        res.status(500).json({ messge: "Internal Server Error", err });
    }
};

export default getAllOrders;
