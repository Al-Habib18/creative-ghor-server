/** @format */

import { Request, Response } from "express";
import { createProduct as createNewProduct } from "../../services/products";
import { createProductSchema } from "../../schemas/index";
import { getAuth } from "@clerk/express";
import { badRequest, serverError, unauthorized } from "../../utils/request";

const createProduct = async (req: Request, res: Response) => {
    let { name, description, price, discount, category, image, stock } =
        req.body;
    try {
        const { userId } = getAuth(req);
        if (!userId) unauthorized(res, "Unauthorized");
        if (!req.body) badRequest(res, "No body found");
        if (!req.file) badRequest(res, "No file found");
        const data = {
            userId: userId as string,
            name: name as string,
            description: description as string,
            price: Number(price),
            discount: Number(discount),
            category: category as string,
            image: req.file?.path as string,
            stock: Number(stock),
        };

        const result = createProductSchema.safeParse(data);

        if (!result.success) badRequest(res, result.error.message);
        const product = await createNewProduct(result.data);
        res.status(201).json({
            message: "Product created successfully",
            data: product,
        });
    } catch (err) {
        console.error("Error in creating product:", err);
        serverError(res, "Internal Server Error");
    }
};

export default createProduct;
