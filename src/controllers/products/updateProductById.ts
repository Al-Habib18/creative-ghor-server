/** @format */

import { Request, Response } from "express";
import { getProductById as findProductById } from "../../services/products";
import { updateProductById as updateProduct } from "../../services/products";

const updateProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        //TODO: validtae id

        const product = await findProductById(id);

        if (!product) {
            return res.status(404).json({ message: "No product found" });
        }

        const data = req.body;
        const updatedProduct = await updateProduct(id, data);

        res.status(200).json({
            message: "A Product updated Successfully",
            data: updatedProduct,
        });
    } catch (err) {
        console.log("error in updating product by id", err);
        res.status(500).json({ messge: "Internal Server Error", err });
    }
};

export default updateProductById;
