/** @format */

import { Request, Response } from "express";
import { getAllProducts as getListOfProducts } from "../../services/products";

const getAllProducts = async (req: Request, res: Response) => {
    //TODO:
    try {
        const products = await getListOfProducts();

        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json({
            message: "A List of Products retive Successfully",
            data: products,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ messge: "Internal Server Error", err });
    }
};

export default getAllProducts;
