/** @format */

import { Request, Response } from "express";
import { createShippingAddressSchema } from "../../schemas/index";
import { createShippingAddress as createNewShippingAddress } from "../../services/shippingAddress";
import { getAuth } from "@clerk/express";
import { badRequest, unauthorized } from "../../utils/request";

const createShippingAddress = async (req: Request, res: Response) => {
    try {
        let { division, district, upzila, postalCode, phoneNumber } = req.body;
        if (!req.body) return badRequest(res, "No body found");
        const { userId } = getAuth(req);
        if (!userId) return unauthorized(res, "Unauthorized");

        const data = {
            userId: userId,
            division: division as string,
            district: district as string,
            upzila: upzila as string,
            postalCode: postalCode as string,
            phoneNumber: phoneNumber as string,
        };

        const result = createShippingAddressSchema.safeParse(data);
        if (!result.success) badRequest(res, result.error.message);

        const shippingAddress = await createNewShippingAddress(data);
        return res.status(200).json({
            message: "Shipping Address created successfully",
            data: shippingAddress,
        });
    } catch (error) {
        console.log("error in creating shipping address", error);
        return res.status(500).json({ error });
    }
};

export default createShippingAddress;
