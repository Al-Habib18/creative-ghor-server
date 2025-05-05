/** @format */

import { Request, Response } from "express";

const failController = (req: Request, res: Response) => {
    console.log("I am hitting...");

    // Handle your payment success logic...
    //TODO: update order

    // Redirect to a confirmation page on the frontend
    res.writeHead(302, {
        Location: `http://localhost:3000/checkout/payment?status=fail`,
    });
    res.end();
};

export default failController;
