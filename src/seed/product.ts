/** @format */

import prisma from "../schemas/prisma";

const seedProducts = async () => {
    await prisma.product.createMany({
        data: [
            {
                id: "prod_1",
                userId: "user_1",
                name: "Wireless Mouse",
                description: "A smooth wireless mouse",
                price: 25.99,
                discount: 5.0,
                category: "ELECTRONICS",
                images: ["https://example.com/mouse1.png"],
                stock: 100,
                rating: 4.5,
                reviewsCount: 2,
            },
            {
                id: "prod_2",
                userId: "user_1",
                name: "Running Shoes",
                description: "Comfortable running shoes",
                price: 49.99,
                category: "FASHION",
                images: ["https://example.com/shoes1.png"],
                stock: 50,
                rating: 4.8,
                reviewsCount: 1,
            },
        ],
    });
};

export default seedProducts;
