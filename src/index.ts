/** @format */

import cors from "cors";
import express from "express";
import { PORT } from "./config/env";
import routes from "./routes";
import paymentSuccessRoute from "./routes/paymentRoutes";
import morgan from "morgan";
import { clerkMiddleware } from "@clerk/express";

const app = express();

// Middleware
const corsOptions = {
    origin: ["http://localhost:3000", "https://creativeghor.onrender.com"], // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, headers, etc.)
};

app.use(paymentSuccessRoute);

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(clerkMiddleware()); // clerk middleware for auth
app.use(express.urlencoded({ extended: true }));

app.get("/hello", (req, res) => {
    res.json({ message: "hello world" });
});
// Use combined routes
app.use(routes);

app.use("/*", (req, res) => {
    console.log("url:-", req.url);
    res.status(404).json({ message: "Route Not Found" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

// export default app
