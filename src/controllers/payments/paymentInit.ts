/** @format */

import { Request, Response } from "express";
import SSLCommerzPayment from "sslcommerz-lts";
// import getOrderById from your DB service

const paymentInitController = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res
                .status(400)
                .json({ error: "Missing orderId in request body" });
        }

        // TODO: Replace with your actual DB call
        // const order = await getOrderById(orderId);
        // if (!order) return res.status(404).json({ error: "Order not found" });
        
        const amount = 1200; // Replace with: order.totalAmount;

        const store_id = process.env.SSL_STORE_ID;
        const store_passwd = process.env.SSL_STORE_PASS;
        const is_live = false;

        if (!store_id || !store_passwd) {
            return res.status(500).json({
                error: "Missing SSLCommerz credentials in environment variables.",
            });
        }

        const data = {
            total_amount: amount,
            currency: "BDT",
            tran_id: orderId,
            success_url: `http://localhost:4000/api/payment/success/${orderId}`,
            fail_url: `http://localhost:4000/api/payment/fail/${orderId}`,
            cancel_url: `http://localhost:4000/api/payment/cancel/${orderId}`,
            ipn_url: "http://localhost:4000/api/payment/ipn",
            shipping_method: "Courier",
            product_name: "Ecommerce Checkout",
            product_category: "General",
            product_profile: "general",
            cus_name: "Customer Name",
            cus_email: "customer@example.com",
            cus_add1: "Dhaka",
            cus_city: "Dhaka",
            cus_postcode: "1207",
            cus_country: "Bangladesh",
            cus_phone: "01711111111",
            ship_name: "Customer Name",
            ship_add1: "Dhaka",
            ship_city: "Dhaka",
            ship_postcode: "1207",
            ship_country: "Bangladesh",
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const apiResponse = await sslcz.init(data);

        const { GatewayPageURL } = apiResponse;

        if (typeof GatewayPageURL === "string" && GatewayPageURL.length > 0) {
            console.log("GatewayPageURL:-", GatewayPageURL);
            return res.status(200).json({ GatewayPageURL });
        } else {
            return res.status(500).json({
                error: "Failed to get GatewayPageURL",
                details: apiResponse,
            });
        }
    } catch (err) {
        console.error("Error in payment init:", err);
        return res.status(500).json({
            error: "Payment session failed",
            details: (err as Error).message || err,
        });
    }
};

export default paymentInitController;
