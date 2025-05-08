/** @format */

import { Request, Response } from "express";
import { getAllProductsOfUser as getAllProductsOfSingleUser } from "../../services/users";
import { idSchema } from "../../schemas/index";
import { badRequest } from "../../utils/request";
const getAllProductsOfUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = idSchema.safeParse(id);
        if (!result.success) return badRequest(res, result.error.message);

        const products = await getAllProductsOfSingleUser(id);

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
