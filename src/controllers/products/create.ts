/** @format */

import { Request, Response } from "express";
import { createProduct as createNewProduct } from "../../services/products";

const createProduct = async (req: Request, res: Response) => {
    try {
        //TODO: validate data
        //TODO: check permission

        const data = req.body;

        const product = await createNewProduct(data);

        res.status(200).json({
            message: "Product created Successfully",
            data: product,
        });
    } catch (err) {
        console.log("error in creating product", err);
        res.status(500).json({ messge: "Internal Server Error", err });
    }
};

export default createProduct;
