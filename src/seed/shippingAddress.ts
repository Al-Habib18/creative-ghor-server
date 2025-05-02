/** @format */

import prisma from "../schemas/prisma";

const seedShippingAddresses = async () => {
    await prisma.shippingAddress.createMany({
        data: [
            {
                id: "addr_1",
                userId: "user_1",
                division: "Dhaka",
                district: "Dhaka",
                upzila: "Gulshan",
                postalCode: "1212",
                phoneNumber: "01234567890",
            },
            {
                id: "addr_2",
                userId: "user_2",
                division: "Chattogram",
                district: "Chattogram",
                upzila: "Pahartali",
                postalCode: "4000",
                phoneNumber: "01987654321",
            },
        ],
    });
};
export default seedShippingAddresses;
