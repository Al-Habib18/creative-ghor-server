/** @format */

import { Request, Response } from "express";
import { getProductById as findProductById } from "../../services/products";
import { updateProductById as updateProduct } from "../../services/products";
import { badRequest } from "../../utils/request";
import { idSchema, updateProductSchema } from "../../schemas/index";

const updateProductById = async (req: Request, res: Response) => {
    try {
        const { name, description, price, discount, category, image, stock } =
            req.body;

        const id = req.params.id;
        if (id === undefined) badRequest(res, "No Product_id found");

        const result = idSchema.safeParse(id);
        if (!result.success) return badRequest(res, result.error.message);

        const product = await findProductById(id);

        if (!product) {
            return res.status(404).json({ message: "No product found" });
        }
        //TODO: if image is provided, upload it and delete the old one
        const data = {
            name: name as string,
            description: description as string,
            price: Number(price),
            discount: Number(discount),
            category: category as string,
            image: req.file?.path as string,
            stock: Number(stock),
        };

        const result2 = updateProductSchema.safeParse(data);
        if (!result2.success) return badRequest(res, result2.error.message);

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
