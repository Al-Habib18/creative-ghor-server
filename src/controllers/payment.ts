/** @format */

import { Request, Response } from "express";
import SSLCommerzPayment from "sslcommerz-lts";

const paymentController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { amount } = req.body;

        const store_id = process.env.SSL_STORE_ID;
        const store_passwd = process.env.SSL_STORE_PASS;
        const is_live = false;

        if (!store_id || !store_passwd) {
            res.status(500).json({
                error: "Missing SSLCommerz credentials in environment variables.",
            });
            return;
        }

        const data = {
            total_amount: amount || 100,
            currency: "BDT",
            tran_id: "REF" + Date.now(),
            success_url: "http://localhost:3000/success",
            fail_url: "http://localhost:3000/fail",
            cancel_url: "http://localhost:3000/cancel",
            ipn_url: "http://localhost:3000/ipn",
            shipping_method: "Courier",
            product_name: "Ecommerce Checkout",
            product_category: "General",
            product_profile: "general",
            cus_name: "Customer Name",
            cus_email: "customer@example.com",
            cus_add1: "Dhaka",
            cus_city: "Dhaka", // ✅ Required
            cus_postcode: "1207", // ✅ Recommended
            cus_country: "Bangladesh",
            cus_phone: "01711111111",
            ship_name: "Customer Name",
            ship_add1: "Dhaka",
            ship_city: "Dhaka", // ✅ Required
            ship_postcode: "1207", // ✅ Recommended
            ship_country: "Bangladesh",
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

        const apiResponse = await sslcz.init(data);
        const { GatewayPageURL } = apiResponse;

        if (GatewayPageURL) {
            console.log("GatewayPageURL ::", GatewayPageURL);
            res.json({ GatewayPageURL });
        } else {
            res.status(500).json({
                error: "Failed to get GatewayPageURL",
                details: apiResponse,
            });
        }
    } catch (err) {
        console.log("err in payment ", err);
        res.status(500).json({
            error: "Payment session failed",
            details: (err as Error).message || err,
        });
    }
};

export default paymentController;
