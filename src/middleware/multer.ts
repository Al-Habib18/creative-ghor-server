/** @format */

import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

// Use memory storage for direct upload to S3
const storage = multer.memoryStorage();

// Accept only JPEG and PNG images
const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
): void => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPEG and PNG images are allowed"));
    }
};

// Export configured multer middleware
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Optional: limit file size to 5MB
    },
});

export default upload;
