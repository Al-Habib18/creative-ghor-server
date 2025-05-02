/** @format */

import { Request, Response } from "express";
import { getProductById as findProductById } from "../../services/products";

const getProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        //TODO: validtae id

        const product = await findProductById(id);

        if (!product) {
            return res.status(404).json({ message: "No product found" });
        }

        res.status(200).json({
            message: "A Product retive Successfully",
            data: product,
        });
    } catch (err) {
        console.log("error in getting product by id", err);
        res.status(500).json({ messge: "Internal Server Error", err });
    }
};

export default getProductById;
