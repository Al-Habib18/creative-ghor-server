/** @format */

import { Request, Response } from "express";

const paymentFailController = (req: Request, res: Response) => {
    console.log("I am hitting...");

    const id = req.params.id;
    // Handle your payment success logic...

    console.log("req.body:-", req.body);

    // Redirect to a confirmation page on the frontend
    res.writeHead(302, {
        Location: `http://localhost:3000/checkout/payment?orderId=${id}&status=failed`,
    });
    res.end();
};

export default paymentFailController;
