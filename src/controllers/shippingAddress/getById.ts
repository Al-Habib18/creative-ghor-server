/** @format */

import { Request, Response } from "express";
import { getShippingAddressById as findShippingAddressById } from "../../services/shippingAddress";

const getShippingAddressById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        //TODO: validate request body
        const shippingAddress = await findShippingAddressById(id);

        if (!shippingAddress) {
            return res
                .status(404)
                .json({ message: "No shipping address found" });
        }
        return res.status(200).json({
            message: "Shipping Address retrive successfully",
            data: shippingAddress,
        });
    } catch (error) {
        console.log("error in retriving shipping address", error);
        return res.status(500).json({ error });
    }
};

export default getShippingAddressById;
