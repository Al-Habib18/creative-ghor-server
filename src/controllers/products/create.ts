/** @format */

import { Request, Response } from "express";
import { createProduct as createNewProduct } from "../../services/products";
import demo from "../../utils/demo";

const createProduct = async (req: Request, res: Response) => {
    try {
        //TODO: validate data
        //TODO: check permission

        //upload image to cloudinar
        //TODO: validate image
        let data = req.body;

        const imageUrl = req.file?.path;

        // let data = demo(req.body);
        data.images[0] = imageUrl;

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
