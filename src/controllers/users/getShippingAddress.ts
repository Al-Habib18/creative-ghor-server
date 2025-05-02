/** @format */

import { Request, Response } from "express";
import { getAllShippingAddressesOfUser } from "../../services/shippingAddress";

const getShippingAddressOfUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        //TODO: validate id
        const shippingAddress = await getAllShippingAddressesOfUser(id);

        if (!shippingAddress) {
            return res
                .status(404)
                .json({ message: "No shippingAddress found" });
        }

        res.status(200).json({
            message: "A List of Products retive Successfully",
            data: shippingAddress,
        });
    } catch (err) {
        console.log("error in getting shipping address of a user", err);
        res.status(500).json({ messge: "Internal Server Error", err });
    }
};

export default getShippingAddressOfUser;
