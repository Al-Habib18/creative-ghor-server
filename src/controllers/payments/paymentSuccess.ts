/** @format */

import { Request, Response } from "express";
import { updatePaymentStatusOfOrderById } from "../../services/orders";
import { badRequest } from "../../utils/request";
import { idSchema } from "../../schemas/index";
import { PaymentStatus } from "@prisma/client";
import { createPayment } from "../../services/payment";
import sendPaymentSuccessEmail from "../../utils/email";

const paymentSuccessController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ message: "No order id found" });
        const result = idSchema.safeParse(id);
        if (!result.success) return badRequest(res, result.error.message);

        // Update the payment status of the order
        await updatePaymentStatusOfOrderById(id, PaymentStatus.PAID);

        //Create the payment record in the database
        await createPayment(id);

        // send email to the user
        await sendPaymentSuccessEmail(id);

        // Redirect to a confirmation page on the frontend
        res.writeHead(302, {
            Location: `http://localhost:3000/checkout/confirmation?orderId=${id}&status=success`,
        });
        res.end();
    } catch (err) {
        console.log("Error in payment success controller:", err);
        res.status(500).json({ messge: "Internal Server Error", err });
    }
};

export default paymentSuccessController;
