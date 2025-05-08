/** @format */

import { Request, Response } from "express";
import { createProduct as createNewProduct } from "../../services/products";
import { createProductSchema } from "../../schemas/index";
import { getAuth } from "@clerk/express";
import { badRequest, serverError, unauthorized } from "../../utils/request";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../../config/s3";
import { v4 as uuidv4 } from "uuid";
import { AWS_BUCKET_NAME, AWS_REGION } from "../../config/env";

const createProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return unauthorized(res, "Unauthorized");
        if (!req.body) return badRequest(res, "No body found");
        if (!req.file) return badRequest(res, "No file found");

        const file = req.file;
        const uniqueKey = `products/${uuidv4()}-${file.originalname}`;

        // Upload file to S3
        await s3.send(
            new PutObjectCommand({
                Bucket: AWS_BUCKET_NAME,
                Key: uniqueKey,
                Body: file.buffer,
                ContentType: file.mimetype,
            })
        );

        const imageUrl = `https://${AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueKey}`;

        const data = {
            userId,
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            category: req.body.category,
            image: imageUrl,
            stock: Number(req.body.stock),
        };
        // Validate product data
        const result = createProductSchema.safeParse(data);
        if (!result.success) return badRequest(res, result.error.message);

        const product = await createNewProduct(result.data);

        res.status(201).json({
            message: "Product created successfully",
            data: product,
        });
    } catch (err) {
        console.error("Error in creating product:", err);
        return serverError(res, "Internal Server Error");
    }
};

export default createProduct;
