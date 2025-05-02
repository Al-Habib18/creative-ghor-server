/** @format */

import { Request, Response } from "express";

import { deleteShippingAddressById as deleteShippingAddress } from "../../services/shippingAddress";
import { getShippingAddressById } from "../../services/shippingAddress";

const deleteShippingAddressById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        //TODO: validate id

        const shippingAddress = await getShippingAddressById(id);
        if (!shippingAddress) {
            return res
                .status(404)
                .json({ message: "No shippingAddress found" });
        }

        await deleteShippingAddress(id);
        return res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.log("error in deleting review by id", error);
        return res.status(500).json({ error });
    }
};

export default deleteShippingAddressById;
