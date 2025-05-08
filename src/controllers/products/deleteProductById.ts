/** @format */

import { Request, Response } from "express";
import { getProductById as findProductById } from "../../services/products";
import { deleteProductById as deleteProduct } from "../../services/products";
import { badRequest } from "../../utils/request";
import { idSchema } from "../../schemas/index";
import { deleteAllReviewsOfProduct } from "../../services/reviews";

const deleteProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (id === undefined) badRequest(res, "No Product_id found");

        const result = idSchema.safeParse(id);
        if (!result.success) return badRequest(res, result.error.message);

        const product = await findProductById(id);

        if (!product) {
            return res
                .status(404)
                .json({ message: "No product found in the database" });
        }
        //delete reviews of that product
        await deleteAllReviewsOfProduct(id);

        // delete product
        await deleteProduct(id);

        res.status(200).json({
            message: "A Product deleted Successfully",
        });
    } catch (err) {
        console.log("error in deleting product by id", err);
        res.status(500).json({ messge: "Internal Server Error", err });
    }
};

export default deleteProductById;
