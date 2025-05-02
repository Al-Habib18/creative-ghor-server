/** @format */

import cors from "cors";
import express from "express";
import { PORT } from "./config/env";
import routes from "./routes";
import morgan from "morgan";

const app = express();

// Middleware
const corsOptions = {
    origin: ["http://localhost:3000", "https://creativeghor.onrender.com"], // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); //
// Use combined routes
app.use(routes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

// export default app
