/** @format */
import { Resend } from "resend";
import { RESEND_API_KEY } from "../config/env";
// optional: your custom logger

const resend = new Resend(RESEND_API_KEY);

const sendPaymentSuccessEmail = async (orderId: string) => {
    try {
        //TODO: Replace with your actual DB call
        // const order = await getOrderById(orderId);
        // if (!order) return;

        const order = { id: orderId, user: { email: "ah18bd@gmail.com" } };
        const email = order.user.email;

        const { data, error } = await resend.emails.send({
            from: "Create Shop <creativeshop@resend.dev>",
            to: email,
            subject: "Your Order Has Been Paid Successfully!",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 16px; background-color: #f9f9f9;">
                    <h2>Thank you for your purchase!</h2>
                    <p>Your order <strong>#${order.id}</strong> has been successfully paid.</p>
                    <p>We'll notify you once it ships.</p>
                    <hr />
                    <p>If you have any questions, reply to this email.</p>
                    <p>— Creative Shop Team</p>
                </div>
            `,
        });

        console.log("email data:-", data);

        if (error) {
            console.error("Error sending payment confirmation email:", error);
        } else {
            console.log(
                `Payment success email sent to ${email} for order ${orderId}`
            );
        }
    } catch (err) {
        console.error("Failed to send payment success email:", err);
    }
};

export default sendPaymentSuccessEmail;
