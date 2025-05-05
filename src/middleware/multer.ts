/** @format */

/* import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudanary";
import multer from "multer";

const storage = new CloudinaryStorage({
    cloudinary,
    params: () => ({
        folder: "creative-ghor",
        allowed_formats: ["jpg", "png"],
    }),
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // optional: max 5MB
});

export default upload;
 */

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

export default upload;
