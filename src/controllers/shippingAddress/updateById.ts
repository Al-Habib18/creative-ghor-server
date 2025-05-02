/** @format */

import { Request, Response } from "express";
import { updateShippingAddressById as updateShippingAddress } from "../../services/shippingAddress";
import { getShippingAddressById as findShippingAddressById } from "../../services/shippingAddress";
const updateShippingAddressById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        //TODO: validate request body
        const shippingAddress = await findShippingAddressById(id);

        if (!shippingAddress) {
            return res
                .status(404)
                .json({ message: "No shipping address found" });
        }

        const updatedShippingAddress = await updateShippingAddress(
            id,
            req.body
        );
        return res.status(200).json({
            message: "Shipping Address updated successfully",
            data: updatedShippingAddress,
        });
    } catch (error) {
        console.log("error in updating shipping address", error);
        return res.status(500).json({ error });
    }
};

export default updateShippingAddressById;
