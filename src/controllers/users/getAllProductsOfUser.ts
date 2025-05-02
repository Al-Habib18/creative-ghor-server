/** @format */

import { Request, Response } from "express";
import { getAllProductsOfUser as getAllProductsOfSingleUser } from "../../services/users";
const getAllProductsOfUser = async (req: Request, res: Response) => {
    try {
        const products = await getAllProductsOfSingleUser(req.params.id);

        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json({
            message: "A List of Products retive Successfully",
            data: products,
        });
    } catch (err) {
        console.log("error in getting product of a user", err);
        res.status(500).json({ messge: "Internal Server Error", err });
    }
};

export default getAllProductsOfUser;
