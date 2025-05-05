/** @format */

import { Request, Response } from "express";

const successController = (req: Request, res: Response) => {
    console.log("I am hitting...");

    // Handle your payment success logic...
    //TODO: create payment
    //TODO: update order
    

    // Redirect to a confirmation page on the frontend
    res.writeHead(302, {
        Location: `http://localhost:3000/checkout/confirmation`,
    });
    res.end();
};

export default successController;
