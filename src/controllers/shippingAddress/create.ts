/** @format */

import { Request, Response } from "express";
import { createShippingAddress as createNewShippingAddress } from "../../services/shippingAddress";

const createShippingAddress = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        //TODO: validate request body
        const shippingAddress = await createNewShippingAddress(data);
        return res.status(200).json({
            message: "Shipping Address created successfully",
            data: shippingAddress,
        });
    } catch (error) {
        console.log("error in creating shipping address", error);
        return res.status(500).json({ error });
    }
};

export default createShippingAddress;
