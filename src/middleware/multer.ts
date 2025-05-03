/** @format */

import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudanary";
import multer from "multer";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "creative-ghor",
        allowed_formats: ["jpg", "png"],
    } as any,
});

const upload = multer({ storage });

export default upload;
